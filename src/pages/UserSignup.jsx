
    import { Formik, Form, Field } from 'formik';
    import * as Yup from 'yup';
    import { Link, useNavigate } from "react-router-dom"

    const Register = () => {
        const navigate = useNavigate();
        const validationSchema = Yup.object({
            firstName: Yup.string()
                .required('firstName is required'),
            lastName: Yup.string()
                .required('lastName is required'),
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
    
            const { firstName, lastName, ...rest } = values;
            const fullName = {
                firstName : firstName,
                lastName : lastName
            }
            console.log(`fullName : ${fullName.firstName} ${fullName.lastName}ame} ${fullName.lastName}`)
            try {
                const response = await fetch("http://localhost:8000/user/register", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({fullName, ...rest}),
                });
    
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                navigate("/login")
                console.log(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
    
        return (
            <div className="p-5 h-screen flex flex-col justify-between">
                <div>
                    <Formik
                        initialValues={{ firstName: '', lastName:'', email: '', password: ''}}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched }) => (
                            <Form className="mt-4 space-y-4">
                                <label htmlFor="name" className="block font-bold mb-2">Full Name</label>
                                <div className="flex justify-between align-middle gap-1 text-white">
                                    <Field
                                        type="text"
                                        name="firstName"
                                        placeholder="First Name"
                                        className="w-full p-2 border rounded-xl text-black bg-[#B3B3B3] outline-none border-none cursor-text"
                                    />
                                    {errors.name && touched.name && (
                                        <div className="text-red-500 text-sm">{errors.name}</div>
                                    )}
                                    <Field
                                        type="text"
                                        name="lastName"
                                        placeholder="Last Name"
                                        className="w-full p-2 border rounded-xl text-black bg-[#B3B3B3] outline-none border-none cursor-text"
                                    />
                                    {errors.name && touched.name && (
                                        <div className="text-red-500 text-sm">{errors.name}</div>
                                    )}
                                </div>
    
                                <div>
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
                                        autoComplete="new-password"
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
                                    Register
                                </button>
                                <div className="flex justify-center gap-2">
                                    <p className="text-[#000000]">Already have an account?</p>
                                    <Link to="/login" className="cursor-pointer text-blue-900" >Login</Link>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
                <div className="mt-4">
                <Link to="/captainRegister" className="text-[#000000] item">
                    <button
                        type="submit"
                        className="w-full font-bold bg-[#000000] text-white py-3 rounded-xl"
                    >
                    Register as Captain
                    </button>
                </Link>
            </div>
            </div>
        );
    }
    
export default Register;