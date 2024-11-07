'use client'
import { useState,useEffect } from "react";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import PocketBase from 'pocketbase';
  import { LoginForm } from "./loginForm";

const pb = new PocketBase('http://172.16.15.138:8080');

  export function User_avatar({onLogin ,setUser, user}) {

    //const [user,setUser]=useState(null)
    useEffect(()=>{
        setUser(pb.authStore.model)
    },[])
    // const login = async ()=>{
    //     setUser(pb.authStore.model)
    // }
    const logout = async()=>{
        pb.authStore.clear();
        setUser(null)
    }
    return (
        <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Avatar className="w-[70px] h-[70px]">
        <AvatarImage src={user && pb.files.getUrl(user, user.avatar)} alt="@shadcn" />
        <AvatarFallback>user</AvatarFallback>
      </Avatar>
      </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>{user?user.username : "niezalogowany"}</DropdownMenuLabel>
    <DropdownMenuSeparator />
    {user ? 
    <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
    :
    <DropdownMenuItem asChild><LoginForm onLogin={onLogin}/></DropdownMenuItem>
    }
  </DropdownMenuContent>
</DropdownMenu>
      
    )
  }
  