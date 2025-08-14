'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Cliente } from '@/lib/types';
import { clientsService } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import toast from 'react-hot-toast';

interface ClientFormProps {
  onClientCreated?: () => void;
}

export function ClientForm({ onClientCreated }: ClientFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Cliente>({
    fullName: '',
    email: '',
    cpf: '',
    rg: '',
    cell1: '',
    address: '',
    number: '',
    neighborhood: '',
    municipality: '',
    zipCode: '',
    state: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await clientsService.createCliente(formData);
      toast.success('Cliente criado com sucesso!');
      setFormData({
        fullName: '',
        email: '',
        cpf: '',
        rg: '',
        cell1: '',
        address: '',
        number: '',
        neighborhood: '',
        municipality: '',
        zipCode: '',
        state: '',
      });
      setIsOpen(false);
      onClientCreated?.();
    } catch (error: any) {
      toast.error(error.message || 'Erro ao criar cliente');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof Cliente, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) {
    return (
      <Button onClick={() => setIsOpen(true)} className="mb-6">
        <Plus className="h-4 w-4" />
        Novo Cliente
      </Button>
    );
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Cadastrar Novo Cliente</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nome Completo *"
              value={formData.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              required
            />
            <Input
              label="E-mail *"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              required
            />
            <Input
              label="CPF *"
              value={formData.cpf}
              onChange={(e) => handleChange('cpf', e.target.value)}
              required
            />
            <Input
              label="RG"
              value={formData.rg}
              onChange={(e) => handleChange('rg', e.target.value)}
            />
            <Input
              label="Celular *"
              value={formData.cell1}
              onChange={(e) => handleChange('cell1', e.target.value)}
              required
            />
            <Input
              label="Endereço"
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
            />
            <Input
              label="Número"
              value={formData.number}
              onChange={(e) => handleChange('number', e.target.value)}
            />
            <Input
              label="Bairro"
              value={formData.neighborhood}
              onChange={(e) => handleChange('neighborhood', e.target.value)}
            />
            <Input
              label="Município"
              value={formData.municipality}
              onChange={(e) => handleChange('municipality', e.target.value)}
            />
            <Input
              label="CEP"
              value={formData.zipCode}
              onChange={(e) => handleChange('zipCode', e.target.value)}
            />
            <Input
              label="Estado"
              value={formData.state}
              onChange={(e) => handleChange('state', e.target.value)}
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button type="submit" loading={loading}>
              Salvar Cliente
            </Button>
            <Button 
              type="button" 
              variant="secondary" 
              onClick={() => setIsOpen(false)}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
