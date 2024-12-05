import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from "react-router-dom";

const CaptainRegister = () => {
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        color: Yup.string().required('Color is required'), // New field
        plate: Yup.string().required('Plate is required'), // New field
        capacity: Yup.number().required('Capacity is required').positive().integer(), // New field
        vehicleType: Yup.string().required('Vehicle Type is required'), // New field
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        console.log(values);
        setSubmitting(false);

        const { firstName, lastName, color, plate, capacity, vehicleType,email,password } = values;
        const fullName = {
            firstName: firstName,
            lastName: lastName
        };
        const vehicle = {
            color: color,
            plate: plate,
            capacity: capacity,
            vehicleType: vehicleType
        }

        try {
            const response = await fetch("http://localhost:8000/captains/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fullName, vehicle, email , password}),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            navigate("/captainLogin");
            console.log(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="p-5 h-screen flex flex-col ">
            <h1 className="font-bold ">Captain Login</h1>
            <Formik
                initialValues={{ firstName: '', lastName: '', email: '', password: '', color: '', plate: '', capacity: '', vehicleType: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched }) => (
                    <Form className="mt-4 space-y-4">
                        <h1 className="font-bold ">FullName</h1>
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
                        <div>
                            <label htmlFor="color" className="block font-bold mb-2">Color</label>
                            <Field
                                type="text"
                                name="color"
                                placeholder="Vehicle Color"
                                className="w-full p-2 border rounded-xl text-black bg-[#B3B3B3] outline-none border-none cursor-text"
                            />
                            {errors.color && touched.color && (
                                <div className="text-red-500 text-sm">{errors.color}</div>
                            )}
                        </div>

                        <div>
                            <label htmlFor="plate" className="block font-bold mb-2">Plate</label>
                            <Field
                                type="text"
                                name="plate"
                                placeholder="Vehicle Plate"
                                className="w-full p-2 border rounded-xl text-black bg-[#B3B3B3] outline-none border-none cursor-text"
                            />
                            {errors.plate && touched.plate && (
                                <div className="text-red-500 text-sm">{errors.plate}</div>
                            )}
                        </div>

                        <div>
                            <label htmlFor="capacity" className="block font-bold mb-2">Capacity</label>
                            <Field
                                type="number"
                                name="capacity"
                                placeholder="Vehicle Capacity"
                                className="w-full p-2 border rounded-xl text-black bg-[#B3B3B3] outline-none border-none cursor-text"
                            />
                            {errors.capacity && touched.capacity && (
                                <div className="text-red-500 text-sm">{errors.capacity}</div>
                            )}
                        </div>

                        <div>
                            <label htmlFor="vehicleType" className="block font-bold mb-2">Vehicle Type</label>
                            <Field
                                type="text"
                                name="vehicleType"
                                placeholder="Vehicle Type"
                                className="w-full p-2 border rounded-xl text-black bg-[#B3B3B3] outline-none border-none cursor-text"
                            />
                            {errors.vehicleType && touched.vehicleType && (
                                <div className="text-red-500 text-sm">{errors.vehicleType}</div>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full font-bold bg-[#000000] text-white py-3 rounded-xl"
                        >
                            Register as Captain
                        </button>
                        <div className="flex justify-center gap-2">
                            <p className="text-[#000000]">Already have an account?</p>
                            <Link to="/captainLogin" className="cursor-pointer text-blue-900" >Login</Link>
                        </div>
                    </Form>
                )}
            </Formik>
            <div className="mt-4">
                <Link to="/register" className="text-[#000000] item">
                    <button className="w-full font-bold bg-[#000000] text-white py-3 rounded-xl">
                        SignUp as User
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default CaptainRegister;