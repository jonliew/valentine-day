import { MainNavBar } from "./MainNavBar";
import { MobileNavBar } from "./MobileNavBar";

export function SiteHeader() {
	return (
		<header className="w-full border-b">
			<div className="flex h-14 items-center px-4">
				<MainNavBar />
				<MobileNavBar />
			</div>
		</header>
	)
}