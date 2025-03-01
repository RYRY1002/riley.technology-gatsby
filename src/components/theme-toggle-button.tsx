import * as React from "react"
import { ThemeProvider, useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MaterialSymbol } from "gatsby-plugin-material-symbols";

import { UseThemeProps } from "next-themes/dist/types";

export default function ThemeToggleButton() {
  const [position, setPosition] = React.useState("system")
  const { theme, setTheme } = useTheme() as UseThemeProps;
 
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="fixed top-2 right-2">
          <MaterialSymbol symbol="light_mode" size={20} fill className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>
          <MaterialSymbol symbol="dark_mode" size={20} fill className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup value={theme} onValueChange={setPosition}>
          <DropdownMenuRadioItem value="light" onClick={() => setTheme("light")}>Light</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark" onClick={() => setTheme("dark")}>Dark</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system" onClick={() => setTheme("system")}>System</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}