import { Suspense } from "react";
import LoginForm from "@/src/components/auth/LoginForm";

const Login = () => {
	return (
		<div>
			<Suspense fallback={null}>
				<LoginForm />
			</Suspense>
		</div>
	);
};
export default Login;