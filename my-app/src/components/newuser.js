'use client'
import { useState,useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://172.16.15.138:8080');
export default function New_user({setOpen}) {
    const [user,setUser]=useState(null)
    const [pass1,setPass1]=useState(null)
    const [pass2,setPass2]=useState(null)
    const [err,setErr]=useState(false)
    const [zdjecie, setZdjecie] = useState(null)

    const handleUser =  (e)=>{
        setUser(e.target.value)
    }
    const handlePass1 =  (e)=>{
        setPass1(e.target.value)
    }
    const handlePass2 =  (e)=>{
        setPass2(e.target.value)
    }
    const handleZdjecie = (e) =>{
        setZdjecie(e.target.files[0])
      }
    const handleButtonClick = async ()=>{
        console.log(user)
        console.log(pass1)
        console.log(pass2)
        console.log(zdjecie) 

        const formData = new FormData()

        formData.append("username",user)
        formData.append("password",pass1)
        formData.append("passwordConfirm",pass2)
        formData.append("avatar",zdjecie)

        try{
        const record = await pb.collection('users').create(formData);
        console.log(record)
        setOpen()
    }catch(err){
        setErr(true)
        console.log(err)
    }
    //onLogin()
    }
    return(
    <div className="grid gap-4 py-4 items-center justify-center">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Username
            </Label>
            <Input
              id="name"
              defaultValue=""
              className="col-span-3"
              onChange={(e)=>{
                handleUser(e)
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password1" className="text-right">
              Password1
            </Label>
            <Input
              id="password1"
              defaultValue=""
              className="col-span-3"
              type="password"
              onChange={(e)=>{
                handlePass1(e)
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password2" className="text-right">
              Password2
            </Label>
            <Input
              id="password2"
              defaultValue=""
              className="col-span-3"
              type="password"
              onChange={(e)=>{
                handlePass2(e)
              }}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor='zdjecie'>
            Zdjecie
            </Label>
          <Input 
            type='file' 
            id='zdjecie' 
            placeholder='Zdjecie'
            onChange={(e)=>{handleZdjecie(e)}}
          />
        </div>
          <div className="flex flex-col w-full">
        {err && <p>Nie udało się stworzyć konta!</p>}
          <Button onClick={handleButtonClick}>Login</Button>
          </div>
        </div>
    )
}