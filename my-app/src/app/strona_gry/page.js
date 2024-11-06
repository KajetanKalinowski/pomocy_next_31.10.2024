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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
   
  import { Plus } from 'lucide-react';
import { Input } from "@/components/ui/input"
import Image from "next/image";
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import PocketBase from 'pocketbase';
import { Button } from "@/components/ui/button";
import Delete from "@/components/deletegra";
import EditItem from "@/components/editgra";
const pb = new PocketBase('http://172.16.15.138:8080');
export default function Strona() {
    const [gry,setGry] = useState(null)
    const [dane, setDane] = useState({Nazwa:null, Cena: null, Dostepna:null, Opis:null})
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
      const handleBoxChange = (id, e) =>{

        setDane((prev)=>({
          ...prev,
          [id]: e.target.checked
      }))
      console.log(dane)
      }
      const handleSubmit =async ()=>{
        const formData = new FormData()
    
        formData.append("Nazwa", dane.Nazwa)
        formData.append("Cena", dane.Cena)
        formData.append("Dostepna", dane.Dostepna)
        formData.append('obraz',zdjecie)
        formData.append('Opis', dane.Opis)
    
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
      const deleted = (id)=>{
        setGry((prev)=>(
          
          prev.filter((ele)=>{
            return ele.id != id
          })
        ))
      }
      const updated = (item)=>{
        console.log(item)
    
          var index = null
          var tmpGry = [...gry]
          for(let i in gry){
            if(gry[i].id == item.id){
              index = i
            }
          }
          tmpGry[index] == item
          setGry(tmpGry)
          console.log("index: " + index)
        
      }
      const changeCheck = (id)=>{
        var status = id.Dostepna
        
        if(status==true){
          id=true
        }else{
          id=false
        }
        
      console.log(dane)
      }
    
    return(
        <div className="m-3">

      <div className="flex justify-center w-full flex-wrap gap-5">

      
      {gry &&
        gry.map((gra)=>(
          
        <Card className='w-[400px] h-auto flex flex-col p-2 g-2 justify-end'  key={gra.id}>
          <Image
            src={pb.files.getUrl(gra, gra.obraz)}
            alt={gra.obraz}
            width={500}
            height={500}
            className="rounded-md"
            />
          <CardTitle className="p-2">{gra.Nazwa}</CardTitle>
          <CardDescription className="p-2">Cena: {gra.Cena}zł</CardDescription>
          <CardContent>
            {gra.Opis}
          </CardContent>
          <CardFooter className="flex flex-row justify-between">
            <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild><Button>...</Button></DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Delete id={gra.id} ondeleted={deleted}/>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <EditItem item={gra} onupdated={updated}/>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          </div>
            <div className="flex flex-row items-center">
          <Switch onCheckedChange={changeCheck(`${gra.id}`)} id={gra.id} />
          <Label htmlFor={gra.id}>Dostępna</Label>
          </div>
          </CardFooter>
        </Card>
          
        ))
      }
      <Card className='w-[400px] h-[450px] flex flex-col justify-center items-center'>
          <CardFooter>
            
          <Sheet>
  <SheetTrigger><Plus size={400}/></SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Dodawanie</SheetTitle>
      <SheetDescription>
      <div className="mt-5 flex flex-col items-center flex-wrap gap-5">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor='Nazwa'>Nazwa</Label>
          <Input onChange={(e)=>{handleInputChange('Nazwa', e)}} type='text' id='Nazwa' placeholder='Nazwa'></Input>
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor='Cena'>Cena</Label>
          <Input onChange={(e)=>{handleInputChange('Cena', e)}} type='number' id='Cena' placeholder='Cena'></Input>
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor='Dostepna'>Dostępna</Label>
          <Input onChange={(e)=>{handleBoxChange('Dostepna', e)}} type='checkbox' id='Dostepna' placeholder='Dostępna'></Input>
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor='obraz'>Zdjecie</Label>
          <Input onChange={(e)=>{handleZdjecie(e)}} type='file' id='obraz' placeholder='Zdjecie'></Input>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor='Opis'>Opis</Label>
          <Input onChange={(e)=>{handleInputChange('Opis', e)}} type='text' id='Opis' placeholder='Opis'></Input>
        </div>
        <SheetClose asChild>
        <Button onClick={handleSubmit}>Dodaj</Button>
        </SheetClose>
      </div>
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>
          </CardFooter>
        </Card>
      </div>
      
      </div>
    )
}