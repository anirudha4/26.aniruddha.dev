'use client';
import { useTheme } from "next-themes"

type Props = {}
const ThemeSwitcher = ({ }: Props) => {
    const { theme, setTheme } = useTheme()
    return (
        <div className="fixed top-4 right-4"></div>
    )
}
export default ThemeSwitcher