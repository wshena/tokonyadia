'use client'
import { useColorMode } from "@/components/ui/color-mode"
import { ClientOnly, IconButton, Skeleton } from "@chakra-ui/react"
import { LuMoon, LuSun } from "react-icons/lu"

const ThemeToggleButton = () => {
  const { toggleColorMode, colorMode } = useColorMode()

  return (
    <ClientOnly fallback={<Skeleton boxSize="8" />}>
      <IconButton onClick={toggleColorMode} size={{base:'sm', md:"xl"}}>
        {colorMode === "light" ? <LuSun /> : <LuMoon />}
      </IconButton>
    </ClientOnly>
  )
}

export default ThemeToggleButton
