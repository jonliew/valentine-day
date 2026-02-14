import { Heart, MenuIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { ModeToggle } from "./ModeToggle";

export function MobileNavBar() {
	const [open, setOpen] = useState(false);

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button variant="ghost" size="icon" className="md:hidden">
					<MenuIcon />
				</Button>
			</SheetTrigger>
			<SheetContent side="left">
				<div className="flex flex-col items-start gap-2">
					<div className="flex items-center">
						<Heart color="red" fill="red" />
						<div className="ml-2">Valentine</div>
					</div>
					<div>
						<ModeToggle />
					</div>
				</div>
			</SheetContent>
		</Sheet>
	)
}