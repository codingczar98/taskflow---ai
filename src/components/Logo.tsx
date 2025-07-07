/**
 * @copyright 2025 codingczar
 * @license Apache-2.0
 * @description Logo component for the app
 */

/**
 * Assets
 */
import { logo } from "@/assets"

const Logo = () => {
    return (
        <div className="flex items-center gap-3 font-semibold text-lg">
            <img src={logo} alt="TaskFlow AI" className="w-6 h-6" />
            TaskFlow AI
        </div>
    )
}

export default Logo