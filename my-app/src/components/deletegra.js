import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Button } from "./ui/button"


import PocketBase from 'pocketbase';

export default function Delete({id, ondeleted}){

    const pb = new PocketBase('http://172.16.15.138:8080');

    const del = async ()=>{
        console.log(id)
        try{
            await pb.collection('Gry').delete(id);
            ondeleted(id)
        }
        catch(err){
            console.log(err)
        }
    }

    return(
    <AlertDialog>
        <AlertDialogTrigger asChild>
            <Button>Usuń</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Dlaczego tak poważnie?</AlertDialogTitle>
                <AlertDialogDescription>
                    Usuwanie
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={del}>Continue</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
    )
}