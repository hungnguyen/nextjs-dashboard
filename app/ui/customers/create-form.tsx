"use client"

import { Button } from "@/app/ui/button"
import { createCustomer } from "@/app/lib/customer-actions";
import { useFormState } from "react-dom";
import Link from "next/link";

export default function Form(){
    const initialState = {message: null, errors: {}};
    const [state, dispatch] = useFormState(createCustomer, initialState);
    return (
        <form action={dispatch}>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                <div className="mb-4">
                    <label htmlFor="name" className="mb-2 block text-sm font-medium">
                        Customer name
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input 
                                id="name"
                                name="name"
                                type="string"
                                placeholder="Enter customer name"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="name-error"
                            ></input>
                        </div>
                        <div id="name-error" aria-live="polite" aria-atomic="true">
                            {state.errors?.name &&
                                state.errors.name.map((error:string)=>(
                                    <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
                                ))}
                        </div>
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="name" className="mb-2 block text-sm font-medium">
                        Customer email
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input 
                                id="email"
                                name="email"
                                type="string"
                                placeholder="Enter customer email"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="email-error"
                            ></input>
                        </div>
                        <div id="email-error" aria-live="polite" aria-atomic="true">
                            {state.errors?.email &&
                                state.errors.email.map((error:string)=>(
                                    <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
                                ))}
                        </div>
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="name" className="mb-2 block text-sm font-medium">
                        Customer image
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input 
                                id="image_url"
                                name="image_url"
                                type="string"
                                placeholder="Enter customer image"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="image_url-error"
                            ></input>
                        </div>
                        <div id="image_url-error" aria-live="polite" aria-atomic="true">
                            {state.errors?.image_url &&
                                state.errors.image_url.map((error:string)=>(
                                    <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
                                ))}
                        </div>
                    </div>
                </div>
                <div>
                    {state.message && 
                        <p className='mt-2 text-sm text-red-500'>
                        {state.message}
                        </p>
                    }
                </div>
            </div>

            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href="/dashboard/customers"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancel
                </Link>
                <Button type="submit">Create Customer</Button>
            </div>
        </form>
    )
}