'use client'
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState,useEffect } from "react"
import New_user from "./newuser"
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://172.16.15.138:8080');
export function LoginForm({onLogin}) {
    const [user,setUser]=useState(null)
    const [pass,setPass]=useState(null)
    const [err,setErr]=useState(false)
    const [open,setOpen]=useState(false)
    useEffect(()=>{
        setErr(false)
    },[open])
    const handleUser =  (e)=>{
        setUser(e.target.value)
    }
    const handlePass =  (e)=>{
        setPass(e.target.value)
    }
    const handleButtonClick = async ()=>{
        console.log(user)
        console.log(pass)
        try{
        const authData = await pb.collection('users').authWithPassword(
            user,
            pass,
        );
       
    }catch(err){
        setErr(true)
    }
    onLogin()
    }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
  
        <Tabs defaultValue="account" className="w-[400px]">
  <TabsList>
    <TabsTrigger value="account">Logowanie</TabsTrigger>
    <TabsTrigger value="password">Nowe konto</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
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
            <Label htmlFor="username" className="text-right">
              Password
            </Label>
            <Input
              id="username"
              defaultValue=""
              className="col-span-3"
              type="password"
              onChange={(e)=>{
                handlePass(e)
              }}
            />
          </div>
          <div className="flex flex-col w-full">
        {err && <p>Nie udało się zalogować!</p>}
          <Button onClick={handleButtonClick}>Login</Button>
          </div>
        </div>
        
  </TabsContent>
  <TabsContent value="password">
    <New_user setOpen={setOpen}/>
  </TabsContent>
</Tabs>
      </DialogContent>
    </Dialog>
  )
}
