import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Link } from "react-router-dom"

const CaptainLogin = () => {
    //userContext
    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        console.log(values);
        setSubmitting(false);

        try {
            const response = await fetch("http://localhost:8000/captains/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            alert("captain login successfully")
            const data = await response.json();
            console.log(data); // Handle the response data as needed
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="p-5 h-screen flex flex-col justify-between">
            <div>
            {/* <h1>{context}</h1> */}
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched }) => (
                        <Form className="mt-4 space-y-4">
                            <div>
                                <img src="https://machine.global/wp-content/uploads/2022/05/Uber_Logo_Black.png" alt=""
                                    className="w-24 "
                                />
                                <h1 className="font-bold">Captain Login</h1>
                                <label htmlFor="email" className="block font-bold mb-2">Email</label>
                                <Field
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    autoComplete="username"
                                    className="w-full p-2 border rounded-xl text-black bg-[#B3B3B3] outline-none border-none cursor-text"
                                />
                                {errors.email && touched.email && (
                                    <div className="text-red-500 text-sm">{errors.email}</div>
                                )}
                            </div>

                            <div>
                                <label htmlFor="password" className="block font-bold mb-2">Password</label>
                                <Field
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    autoComplete="current-password"
                                    className="w-full p-2 border rounded-xl text-black bg-[#B3B3B3] outline-none border-none cursor-text"
                                />
                                {errors.password && touched.password && (
                                    <div className="text-red-500 text-sm">{errors.password}</div>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="w-full font-bold bg-[#000000] text-white py-3 rounded-xl cursor-pointer"
                            >
                                Login
                            </button>
                            <div className="flex justify-center gap-2">
                                <p className="text-[#000000]">Don&apos;s have an account?</p>
                                <Link to="/captainRegister" className="cursor-pointer text-darkblue" >Register</Link>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            <div className="mt-4">
                <Link to="/captainLogin" className="text-[#000000] item">
                    <button
                        type="submit"
                        className="w-full font-bold bg-[#000000] text-white py-3 rounded-xl"
                    >
                        Login as Captain
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default CaptainLogin;