import React, {useId} from 'react'

// forwardRef is used to connect component used in page and this component
// ref is passed to connect component in that page
const Input = React.forwardRef( function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref){
    // making unique id and giving it to label and input field
    const id = useId()
    return (
        <div className='w-full'>
            {/* if label passed show this component */}
            {label && <label 
            className='inline-block mb-1 pl-1' 
            htmlFor={id}>
                {label}
            </label>
            }
            {/* passing reference to inout field  */}
            <input
            type={type}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            ref={ref}
            {...props}
            id={id}
            />
            {/* ...props is used to spread all other properties passed */}
        </div>
    )
})

export default Input