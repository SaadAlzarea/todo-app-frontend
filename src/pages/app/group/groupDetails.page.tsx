import { State } from "@/common/state.common";
import { Button } from "@/components/ui/button";
import {
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function GroupDetails() {
	/**
	 * * ALERT
	 */
	/**
	 * * GLOBAL
	 */
	/**
	 * * FORM
	 */
	/**
	 * * QUERIES
	 */
	/**
	 * * HANDLERS
	 */
	/**
	 * * EFFECT
	 */

	return (
		<State>
			<div>
				{/* <CommonAlert
					show={showAlert}
					AlertT={alertInfo?.title}
					AlertD={alertInfo?.desc}
					variant={alertInfo?.type === "error" ? "destructive" : "default"}
				/> */}
				<div className=" flex flex-col gap-2">
					<div className="w-full border p-2 flex justify-between items-center">
						<CardHeader className="w-full">
							<CardTitle>Actions in your group</CardTitle>
							<CardDescription>
								Here you can create new project with your team and start and add
								new member activities.
							</CardDescription>
						</CardHeader>
						<CardContent className=" flex gap-2 ">
							<Link to={``}>
								<Button>Members</Button>
							</Link>
							<Button>Create Project</Button>
						</CardContent>
					</div>
					<div className="w-full border p-2 flex flex-col justify-between items-center">
						<CardHeader className="w-full">
							<CardTitle>All Project</CardTitle>
							<CardDescription>
								Here you can see your all your groups.
							</CardDescription>
						</CardHeader>
						<CardContent className="w-full flex gap-2 "></CardContent>
					</div>
				</div>
			</div>
		</State>
	);
}
