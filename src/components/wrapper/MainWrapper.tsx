'use client'

import React, { useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'
import { RootState, useAppDispatch, useAppSelector } from '@/redux/store'
import { getSession, getUser } from '@/redux/slice/auth'
import { setCart } from '@/redux/slice/cart'
import { setAlert } from '@/redux/slice/utility'
import { supabase } from '@/lib/supabaseClient'
import { findUser } from '@/lib/db'

// Components
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import Container from './Container'
import MobileNav from '../off-screen-menu/MobileNav'
import MobileSearch from '../off-screen-menu/MobileSearch'
import CustomAlert from '../feedback/alerts/CustomAlert'
import DeleteHistoryModal from '../modals/DeleteHistoryModal'
import { initWishlist } from '@/redux/slice/wishlist'

// Types
interface MainWrapperProps {
  children: React.ReactNode
}

// Constants
const ALERT_TIMEOUT = 3000

/**
 * MainWrapper component that provides the layout structure and manages global state
 * for authentication, cart, and notifications.
 */
const MainWrapper: React.FC<MainWrapperProps> = ({ children }) => {
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const [authError, setAuthError] = useState<string | null>(null)
  
  // Selectors
  const { profileButtonHover, cartButtonHover, alert, modalClick } = useAppSelector((state: RootState) => state.utility)
  const { session, user } = useAppSelector((state: RootState) => state.auth)
  const { carts: cart } = useAppSelector((state: RootState) => state.cart)

  // Separate manual check for localStorage session
  const checkLocalStorageSession = () => {
    try {
      // Cek localStorage secara manual
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key && key.includes('supabase.auth.token')) {
          console.log('Found Supabase auth token in localStorage with key:', key)
          return true
        }
      }
      return false
    } catch (e) {
      console.error('Error checking localStorage:', e)
      return false
    }
  }

  /**
   * Completely revised authentication initialization
   */
  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true)
      setAuthError(null)
      
      try {
        console.log('=== Starting authentication initialization ===')
        console.log('Checking localStorage manually:')
        const hasLocalStorageSession = checkLocalStorageSession()
        console.log('localStorage session found?', hasLocalStorageSession)
        
        // ========== APPROACH 1: Try standard Supabase getSession ==========
        console.log('STEP 1: Attempting standard getSession call...')
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
        
        if (sessionError) {
          console.error('Standard getSession error:', sessionError)
          setAuthError('Gagal mengambil session: ' + sessionError.message)
        } else {
          console.log('getSession result:', sessionData.session ? 'Session found' : 'No session found')
          
          if (sessionData.session) {
            console.log('Session user ID:', sessionData.session.user.id)
            console.log('Session expires at:', new Date(sessionData.session.expires_at! * 1000))
            
            // If we have a valid session, fetch user data
            if (sessionData.session.user.id) {
              try {
                console.log('Fetching user data...')
                const userData = await findUser(sessionData.session.user.id)
                
                if (userData && userData.length > 0) {
                  console.log('User data found successfully')
                  dispatch(getUser(userData[0]))
                  dispatch(getSession(sessionData.session))
                  setIsLoading(false)
                  return // End execution if successful
                } else {
                  console.warn('No user data found for ID:', sessionData.session.user.id)
                }
              } catch (userError) {
                console.error('Error fetching user data:', userError)
              }
            }
          }
        }
        
        // ========== APPROACH 2: Force session refresh ==========
        console.log('STEP 2: Attempting to refresh session...')
        try {
          const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession()
          
          if (refreshError) {
            console.log('Session refresh error:', refreshError)
          } else if (refreshData.session) {
            console.log('Session refreshed successfully')
            console.log('Refreshed session user ID:', refreshData.session.user.id)
            
            try {
              const userData = await findUser(refreshData.session.user.id)
              
              if (userData && userData.length > 0) {
                console.log('User data found after refresh')
                dispatch(getUser(userData[0]))
                dispatch(getSession(refreshData.session))
                setIsLoading(false)
                return // End execution if successful
              }
            } catch (userError) {
              console.error('Error fetching user data after refresh:', userError)
            }
          } else {
            console.log('No session available after refresh attempt')
          }
        } catch (refreshException) {
          console.error('Exception during refresh:', refreshException)
        }
        
        // ========== APPROACH 3: Force reauthentication if stored data exists ==========
        if (hasLocalStorageSession) {
          console.log('STEP 3: Attempting alternative strategy for localStorage session...')
          // This is a fallback approach - we'll manually try to retrieve and use the session
          
          // Set up a one-time auth state listener
          const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, callbackSession) => {
              console.log('Auth state listener triggered:', event)
              
              if (callbackSession) {
                console.log('Session received from auth state change')
                
                try {
                  const userData = await findUser(callbackSession.user.id)
                  
                  if (userData && userData.length > 0) {
                    console.log('User data found from auth state change')
                    dispatch(getUser(userData[0]))
                    dispatch(getSession(callbackSession))
                  }
                } catch (userError) {
                  console.error('Error fetching user data from auth state change:', userError)
                }
              }
            }
          )
          
          // Force a session check event
          setTimeout(() => {
            // Signal that auth is completed, even though we might be relying on the listener
            setIsLoading(false)
            
            // Clean up the listener after some time
            setTimeout(() => {
              if (authListener && authListener.subscription) {
                authListener.subscription.unsubscribe()
              }
            }, 5000)
          }, 1000)
          
          return
        }
        
        // If we get here, all approaches failed
        console.log('All authentication approaches failed')
        setIsLoading(false)
        dispatch(getSession(null))
        
      } catch (e) {
        console.error('Unhandled exception in auth initialization:', e)
        setAuthError('Terjadi kesalahan tak terduga: ' + String(e))
        setIsLoading(false)
      }
    }
    
    initAuth()
    
    // One-time auth setup - no dependencies
  }, [dispatch])

  /**
   * Initialize cart when user is authenticated
   */
  useEffect(() => {
    if (isLoading) return
    
    const initCart = async () => {
      try {
        // Only initialize cart if user exists and cart is empty
        if (user?.id && (!cart || cart.products === null)) {
          console.log('Initializing cart for user:', user.id)
          dispatch(setCart({
            id: user.id,
            date: new Date().toISOString(),
            products: []
          }))
        }
      } catch (error) {
        console.error('Error initializing cart:', error)
      }
    }
  
    initCart()
  }, [user, cart, dispatch, isLoading])

  /**
   * Manage alert automatic dismissal
   */
  useEffect(() => {
    if (alert.label) {
      const timer = setTimeout(() => {
        dispatch(setAlert({ label: '', type: 'success' }))
      }, ALERT_TIMEOUT)
      
      return () => clearTimeout(timer)
    }
  }, [alert.label, dispatch])

  // init wishlist
  useEffect(() => {
    if (user && user?.id)
      dispatch(initWishlist(user?.id))
  }, [user])

  // Modal background shown when profile or cart is hovered
  const showModalBackground = (profileButtonHover && !!session) || cartButtonHover

  return (
    <div className={`relative ${modalClick ? 'h-[100dvh]' : 'h-fit'}`}>
      <header className="z-50 sticky top-0 left-0 bg-white shadow-sm">
        <Navbar />
      </header>
      
      <main className="relative w-full overflow-x-hidden pb-[50px]">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
            </div>
          </div>
        ) : authError ? (
          <div className="p-4 bg-red-100 text-red-800 rounded-md mb-4 mx-auto max-w-lg mt-4">
            <p className="font-medium">Error Autentikasi:</p>
            <p>{authError}</p>
            <p className="mt-2 text-sm">
              Silakan coba refresh halaman atau logout dan login kembali.
            </p>
          </div>
        ) : (
          <Container>
            {children}
          </Container>
        )}
        
        {/* Mobile Navigation Components */}
        <MobileNav />
        <MobileSearch />

        {/* Modal Background Overlay */}
        {showModalBackground && (
          <Box
            position="fixed"
            height="100vh"
            width="100vw"
            backgroundColor="black"
            opacity={0.6}
            top={0}
            left={0}
            zIndex={40}
            transition="opacity 0.2s ease"
          />
        )}

        {/* Alert Component */}
        {alert.label && (
          <CustomAlert label={alert.label} type={alert.type} />
        )}
      </main>
      
      {/* all modal */}
      {modalClick && (
        <DeleteHistoryModal />
      )}
      
      <footer className="border-t border-gray-200">
        <Footer />
      </footer>
    </div>
  )
}

export default MainWrapper