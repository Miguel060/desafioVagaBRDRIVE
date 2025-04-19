import InsertAnimalForm from "@/app/components/InsertAnimalForm";
import Header from "../components/Header";

export default function Page(){
    return (
        <div >
            <Header/>
            <h1>Cadastrar novo animal</h1>
            <div>
            Preencha os dados abaixo para adicionar um novo animal ao zoológico.
            Certifique-se de inserir informações precisas para manter o sistema atualizado.
            </div>
            <InsertAnimalForm/>
        </div>
    )
}