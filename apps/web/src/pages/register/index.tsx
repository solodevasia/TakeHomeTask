import React from 'react'
import Image from 'next/image'
import Wallpaper from '../../assets/Wallpaper.svg'
import accountIcon from '../../assets/account.svg'
import lockIcon from '../../assets/lock.svg'
import Input from '@bri/shared/input'
import { Button } from '@bri/shared/button'

export default function Home() {
    const [state, setState] = React.useState({ name: '', email: '', password: '', confirmation: '', error: null, loading: false, disabled: true })

    function onChange(event: React.ChangeEvent<HTMLInputElement>): void {
        setState((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
        let disabled = true
        if(state.name && state.email && state.password && state.confirmation) {
            disabled = false
        }
        setState((prevState) => ({...prevState,disabled}))
    }

    async function onSubmit(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault()
        setState((prevState) => ({...prevState, disabled: true, loading: true}))
        fetch("/user", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(state)
        }).then(async(res) => {
            const data = await res.json()
            console.log(data)
            setState((prevState) => ({...prevState, disabled: false, loading: false}))
        })
    }

    return (
        <div className="flex items-center justify-center h-[100vh]">
            {state.error ? <div className="fixed top-0 left-0 w-full p-4 bg-red-500 text-white font-poppins text-center">{state.error}</div> : null}
            <div className='h-[60vh] w-full flex items-center justify-center'>
                <div>
                    <div className="w-full text-center leading-[60px]">
                        <div className="text-[120px] font-bold text-black font-smooch">Join Us</div>
                        <span className="text-[14px] font-poppins">We are glad you want to join us.</span>
                    </div>
                    <div className="mt-2">
                        <Input id='name-input__testid' type="text" name='name' placeholder='Username' value={state.name} onChange={onChange} icon={<Image src={accountIcon} alt={accountIcon} className='w-[24px] h-[24px] mr-2' />} />
                    </div>
                    <div className="mt-6">
                        <Input id='email-input__testid' type="email" name='email' placeholder='Enter your email address' value={state.email} onChange={onChange} icon={<Image src={accountIcon} alt={accountIcon} className='w-[24px] h-[24px] mr-2' />} />
                    </div>
                    <div className="mt-6">
                        <Input type="password" id='password-input__testid' name='password' placeholder='Password' value={state.password} onChange={onChange} icon={<Image src={lockIcon} alt={lockIcon} className='w-[24px] h-[24px] mr-2' />} />
                    </div>
                    <div className="mt-6">
                        <Input type="password" id='confirmation-input__testid' name='confirmation' placeholder='Confirmation' value={state.confirmation} onChange={onChange} icon={<Image src={lockIcon} alt={lockIcon} className='w-[24px] h-[24px] mr-2' />} />
                    </div>
                    <div className="flex items-center justify-center mt-6">
                        <Button id="button-login__testid" type="button" disabled={state.disabled} loading={state.loading} onClick={onSubmit}>
                            <span>Next</span>
                        </Button>
                    </div>
                    <div className="text-center mt-7 font-poppins">
                        You Don't have an account ? <span className='cursor-pointer hover:text-blue-500 hover:underline'>Register</span>
                    </div>
                </div>
            </div>
            <div className="w-full"><Image src={Wallpaper} alt={Wallpaper} /></div>
        </div>
    )
}