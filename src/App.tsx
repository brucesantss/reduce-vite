import { PlusCircle } from "lucide-react"
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
}
  from "./components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
  DialogTitle
} from "./components/ui/dialog"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "./components/ui/calendar"
import React from "react"

const placeholders = "correr 5km"
const status = [
  "não iniciado.",
  "fazendo.",
  "preguiça, mas fazendo.",
  "terminei."
]

const tarefas = [
  { title: "correr 5km", details: "trilha em sp de 5km.", status: "não iniciado.", date: "06/01/2025" },
  { title: "beber 2L de água", details: ".", status: "iniciado.", date: "06/01/2025" },
  { title: "treinar", details: "peito e ombro", status: "não iniciado.", date: "06/01/2025" }
]



export const App = () => {

  const [date, setDate] = React.useState<Date | undefined>(new Date());


  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-3">

      <h1>reduce.</h1>

      {/* nova tarefa div */}
      <div className="flex gap-3">

        <Input placeholder={`${placeholders}`} />

        <Dialog>
          <DialogTrigger asChild>
            <Button>criar nova tarefa.<PlusCircle /></Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-semibold">falta só + um pouco.</DialogTitle>
              <DialogDescription>adicione detalhes, status e data para sua tarefa.</DialogDescription>
            </DialogHeader>

            <div className="flex items-center gap-3">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>

                <SelectContent>

                  {status.map(status => (
                    <SelectGroup id="status">
                      <SelectItem value={status}>{status}</SelectItem>
                    </SelectGroup>
                  ))}

                </SelectContent>

              </Select>

              <Input placeholder="detalhes" />

              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border shadow bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100"
              />


            </div>

          </DialogContent>
        </Dialog>

      </div>

      {/* tabela div */}
      <div className="flex flex-col">
        <Table>
          <TableCaption>continue, do it.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>nome</TableHead>
              <TableHead>detalhes</TableHead>
              <TableHead>status</TableHead>
              <TableHead>data</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {tarefas.map(tarefa => (
              <TableRow>
                <TableCell>{tarefa.title}</TableCell>
                <TableCell>{tarefa.details}</TableCell>
                <TableCell>{tarefa.status}</TableCell>
                <TableCell>{tarefa.date}</TableCell>
              </TableRow>
            ))}

          </TableBody>
        </Table>
      </div>

    </div>
  )
}