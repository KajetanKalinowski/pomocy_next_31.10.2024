'use client'
import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Image from "next/image";
import { Label } from "@/components/ui/label"
import PocketBase from 'pocketbase';
const pb = new PocketBase('http://172.16.15.138:8080');
export default function Strona() {
    const [gry,setGry] = useState(null)
    const [dane, setDane] = useState({nazwa:null, cena: null, dos:null, opis:null})
    const [zdjecie, setZdjecie] = useState(null)
    useEffect(()=>{
        const getData = async()=>{
            try{
                const records = await pb.collection('Gry').getFullList({
                    sort: '-created',
                });
                console.log(records)
                setGry(records)

            }catch(err){
                console.log(err)
            }finally{

            }
        }
        getData()
    },[])
    const handleInputChange = (id, e) =>{

        setDane((prev)=>({
          ...prev,
          [id]: e.target.value
      }))
      console.log(dane)
      }
      const handleSubmit =async ()=>{
        const formData = new FormData()
    
        formData.append("Nazwa", dane.nazwa)
        formData.append("Cena", dane.cena)
        formData.append("Dostepna", dane.dos)
        formData.append('obraz',zdjecie)
        formData.append('Opis', dane.opis)
    
        try{
          const record = await pb.collection('Gry').create(formData);
          setGry((prev)=>([
            ...prev,
            record
          ]))
        } catch(err){
    
        }
      }
      const handleZdjecie = (e) =>{
        console.log(e)
        setZdjecie(e.target.files[0])
      }
    
    return(
        <div>

      <div className="flex justify-center w-full flex-wrap gap-5">

      
      {gry &&
        gry.map((gra)=>(
          
        <Card className='w-[400px]' key={gra.id}>
          <CardTitle>{gra.marka}</CardTitle>
          <CardDescription>{samochod.model}</CardDescription>
          <CardContent>
            <Image
            src={pb.files.getUrl(samochod, samochod.zdjecie)}
            alt={samochod.zdjecie}
            width={500}
            height={500}
            className="rounded-md"
            />
          </CardContent>
          <CardFooter>
            <div className="flex w-full justify-center">
              <div>
                <Delete id={samochod.id}
                ondeleted={deleted}/>
              </div>
              <div>
                <EditItem item={samochod}
                onupdated={updated}/>
              </div>
              <div className="flex justify-end w-full">
                <Timer/>
                <p>Czas parkowania: {samochod.czas_parkowania}</p>
              </div>
            </div>
          </CardFooter>
        </Card>
          
        ))
      }
      </div>
      </div>
    )
}