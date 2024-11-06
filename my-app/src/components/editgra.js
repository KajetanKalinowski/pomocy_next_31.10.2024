'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

import { Button } from "./ui/button"
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "./ui/input"
import PocketBase from 'pocketbase';
import { DialogClose } from "@radix-ui/react-dialog"
import Image from "next/image"

export default function EditItem({item, onupdated}){

    const [dane, setDane] = useState({Nazwa: item.Nazwa, Cena: item.Cena, Dostepna: item.Dostepna, Opis: item.Opis})
    const [zdjecie, setZdjecie] = useState(null)

    const pb = new PocketBase('http://172.16.15.138:8080');

    const handleInputChange = (id, e) =>{

        setDane((prev)=>({
          ...prev,
          [id]: e.target.value
      }))
      console.log(dane)
      }

    const handleZdjecie = (e) =>{
        console.log(e)
        setZdjecie(e.target.files[0])
      }

    const update = async ()=>{
        const formData = new FormData()

        formData.append("Nazwa", dane.Nazwa)
        formData.append("Cena", dane.Cena)
        formData.append("Dostepna", dane.Dostepna)
        formData.append('obraz',zdjecie)
        formData.append('Opis', dane.Opis)

        try{
            const record = await pb.collection('Gry').update(item.id, formData);
            onupdated(record)
        }catch(err){
            console.log(err)
        }
        
       
    }

    return(
    <Dialog>
        <DialogTrigger>
            <Button>Edytuj</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Dlaczego tak poważnie?</DialogTitle>
                <DialogDescription>
                <div className="mt-5 flex flex-col items-center flex-wrap gap-5">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor='Nazwa'>Nazwa</Label>
          <Input defaultValue={item.Nazwa} onChange={(e)=>{handleInputChange('Nazwa', e)}} type='text' id='Nazwa' placeholder='Nazwa'></Input>
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor='Cena'>Cena</Label>
          <Input defaultValue={item.Cena} onChange={(e)=>{handleInputChange('Cena', e)}} type='number' id='Cena' placeholder='Cena'></Input>
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor='Dostepna'>Dostępna</Label>
          <Input defaultValue={item.Dostepna} onChange={(e)=>{handleInputChange('Dostepna', e)}} type='text' id='Dostepna' placeholder='Dostępna'></Input>
        </div>
        <div className="w-[150px] h-[75px] relative">
                        <Image
                        src={pb.files.getUrl(item, item.obraz)}
                        alt={item.Nazwa}
                        fill={true}/>
                    </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor='obraz'>Zdjecie</Label>
          <Input onChange={(e)=>{handleZdjecie(e)}} type='file' id='obraz' placeholder='Zdjecie'></Input>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor='Opis'>Opis</Label>
          <Input defaultValue={item.Opis} onChange={(e)=>{handleInputChange('Opis', e)}} type='text' id='Opis' placeholder='Opis'></Input>
        </div>
        
      </div>

                    <DialogClose asChild>
                        <Button onClick={update}>Save changes</Button>
                    </DialogClose>
                </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>
    )
}