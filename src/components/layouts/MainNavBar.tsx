import { Heart } from "lucide-react";
import { ModeToggle } from "./ModeToggle";

export function MainNavBar() {
	return (
		<div className="hidden md:flex w-full">
			<div className="w-full flex gap-2 justify-between">
				<div className="flex items-center">
					<Heart color="red" fill="red" />
				</div>
				<div className="flex items-center">
					Valentine
				</div>
				<div>
					<ModeToggle />
				</div>
			</div>
		</div>
	)
}