import axios from 'axios';
import { useEffect, useState } from "react";

import { PlusCircle } from "lucide-react";

import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from './components/ui/table';


export const App = () => {
  const [tarefa, setTarefa] = useState({ title: "", details: "", status: "", date: "" });
  const [message, setMessage] = useState<string | undefined>();
  const [tasks, setTasks] = useState<any[]>([]);
  const statusOptions = ["não iniciado", "fazendo", "preguiça, mas fazendo", "terminado"];

  const handleInputChange = (field: string, value: string) => {
    setTarefa((prev) => ({ ...prev, [field]: value }));
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/tasks");
      const data = response.data.message || []; // Ajuste conforme a estrutura da API
      console.log("Tarefas carregadas:", data);
      setTasks(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Erro ao carregar tarefas:", error);
      setTasks([]); // Em caso de erro, definir como array vazio
    }
  };



  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:8080/task/create", tarefa);
      setMessage(response.data.message);
      setTarefa({ title: "", details: "", status: "", date: "" });
      fetchTasks();
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
    }
  };

  useEffect(() => {
    console.log("Estado atualizado de tasks:", tasks);
  }, [tasks]);



  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-5">
      <div className="text-center">
        <h1 className="font-semibold">reduce.</h1>
        <p className="text-slate-500">crie, edite ou delete tarefas.</p>
      </div>

      {/* Criar Tarefa */}
      <form className="min-w-[400px] flex flex-col gap-4">
        <div className="flex gap-4">
          <Input
            placeholder="Nova tarefa"
            value={tarefa.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
          />
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                Criar tarefa <PlusCircle />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Detalhes da Tarefa</DialogTitle>
                <DialogDescription>Adicione detalhes, status e data.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">Nome</Label>
                  <Input
                    id="title"
                    value={tarefa.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="details" className="text-right">Detalhes</Label>
                  <Input
                    id="details"
                    value={tarefa.details}
                    onChange={(e) => handleInputChange("details", e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">Status</Label>
                  <Select onValueChange={(value) => handleInputChange("status", value)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder={tarefa.status || "Selecione"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {statusOptions.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">Data</Label>
                  <Input
                    id="date"
                    type="date"
                    value={tarefa.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleSubmit}>Salvar Tarefa</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </form>

      {/* Lista de Tarefas */}
      <div className="w-full max-w-[600px]">
        <Table>
          <TableCaption>just do it bro.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Detalhes</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.isArray(tasks) && tasks.map((task, index) => (
              <TableRow key={index}>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.details}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>{task.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>


        </Table>
      </div>


      {message && <span>{message}</span>}
    </div>
  );
};
