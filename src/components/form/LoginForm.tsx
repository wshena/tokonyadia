'use client'
import { supabase } from '@/lib/supabaseClient';
import { Box, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { EyeIcon, EyeSlashIcon } from '../icons/Icons';
import GoogleButton from '../buttons/GoolgeButton';
import { useAppDispatch } from '@/redux/store';
import { setAlert } from '@/redux/slice/utility';

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // State untuk form input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passClick, setPassClick] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Fungsi untuk validasi email dengan regex
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Handle login
  const handleLogin = async (e: any) => {
    e.preventDefault();

    // Cek jika email atau password kosong
    if (!email || !password) {
      setError('Email dan password harus diisi.');
      return;
    }

    // Cek validasi email
    if (!isValidEmail(email)) {
      setError('Format email tidak valid.');
      return;
    }

    setError(null); // Reset error jika sudah valid
    setLoading(true); // Aktifkan loading

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log("Login response:", data)
    setLoading(false); // Matikan loading

    if (error) {
      setError(error.message);
      dispatch(setAlert({
        label: error.message,
        type: 'error'
      }))
      return;
    }

    router.push('/');
  };

  return (
    <form onSubmit={handleLogin}>
      <Box width={{base:'300px', md:'fit'}} padding={{base:'1rem', md:"1.3rem"}} borderRadius="10px" className="border shadow-lg">
        <VStack alignItems="center" width="100%" gap="20px">
          {/* Heading */}
          <VStack alignItems="center">
            <Heading as="h1" fontWeight="bold" fontSize="1.6rem">
              Masuk ke Akun
            </Heading>
            <Text fontSize="1rem">
              Belum punya akun?{' '}
              <Link href="/auth/signup" className="text-mainGreen">
                Daftar
              </Link>
            </Text>
          </VStack>

          {/* Login dengan Google */}
          <GoogleButton />

          {/* Garis pemisah */}
          <Flex width="100%" alignItems="center" gap="10px" justifyContent="space-between">
            <span className="h-[2px] w-[170px] bg-gray-300" />
            <span className="text-[.8rem]">atau</span>
            <span className="h-[2px] w-[170px] bg-gray-300" />
          </Flex>

          {/* Error Message */}
          {error && <Text color="red.500" fontSize="0.9rem">{error}</Text>}

          {/* Email Input */}
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-[.6rem] rounded-[10px] border-2 focus:outline-none w-full"
            autoComplete="off"
            required
            placeholder="Masukkan email Anda"
          />

          {/* Password Input */}
          <Flex width="100%" alignItems="center" justifyContent="space-between" padding=".6rem" borderRadius="10px" className="border-2">
            <input
              type={passClick ? 'text' : 'password'}
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-none focus:outline-none w-full"
              required
              placeholder="Masukkan password"
            />
            <button
              type="button"
              onClick={() => setPassClick(!passClick)}
              className="p-1"
            >
              {passClick ? <EyeSlashIcon size={20} color="black" /> : <EyeIcon size={20} color="black" />}
            </button>
          </Flex>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full md:w-[350px] h-[50px] rounded-[10px] text-center border-2 font-bold ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-mainGreen text-white'
            }`}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Masuk'}
          </button>
        </VStack>
      </Box>
    </form>
  );
};

export default LoginForm