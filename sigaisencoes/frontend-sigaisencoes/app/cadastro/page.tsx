'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, User } from 'lucide-react';
import { Cliente } from '@/lib/types';
import { clientsService } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import toast from 'react-hot-toast';

export default function CadastroPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Cliente>({
    fullName: '',
    email: '',
    cpf: '',
    rg: '',
    issuingAgency: '',
    birthDate: '',
    address: '',
    number: '',
    complement: '',
    neighborhood: '',
    municipality: '',
    zipCode: '',
    state: '',
    cell1: '',
    cell2: '',
    driver: false,
    cnh: '',
    municipalityCnh: '',
    cnhValidity: '',
    ipi: '',
    icms: '',
    ipva: '',
    roadTax: '',
    defisCard: '',
    packageIpiIcmsIpva: '',
    packageIpiRodizioDefis: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await clientsService.createCliente(formData);
      toast.success('Cliente cadastrado com sucesso!');
      router.push('/');
    } catch (error: any) {
      toast.error(error.message || 'Erro ao cadastrar cliente');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof Cliente, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCepBlur = async (cep: string) => {
    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        
        if (!data.erro) {
          setFormData(prev => ({
            ...prev,
            address: data.logradouro || '',
            neighborhood: data.bairro || '',
            municipality: data.localidade || '',
            state: data.uf || '',
          }));
          toast.success('CEP encontrado!');
        }
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <Button
          variant="secondary"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
        
        <div className="flex items-center space-x-2">
          <User className="h-6 w-6 text-primary-600" />
          <h1 className="text-2xl font-bold">Cadastrar Novo Cliente</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Dados Pessoais */}
        <Card>
          <CardHeader>
            <CardTitle>Dados Pessoais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <Input
                  label="Nome Completo *"
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  required
                />
              </div>
              <Input
                label="Data de Nascimento"
                type="date"
                value={formData.birthDate}
                onChange={(e) => handleChange('birthDate', e.target.value)}
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
                placeholder="000.000.000-00"
                required
              />
              <Input
                label="RG"
                value={formData.rg}
                onChange={(e) => handleChange('rg', e.target.value)}
              />
              <Input
                label="Órgão Emissor"
                value={formData.issuingAgency}
                onChange={(e) => handleChange('issuingAgency', e.target.value)}
                placeholder="SSP/SP"
              />
            </div>
          </CardContent>
        </Card>

        {/* Contato */}
        <Card>
          <CardHeader>
            <CardTitle>Contato</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Celular Principal *"
                value={formData.cell1}
                onChange={(e) => handleChange('cell1', e.target.value)}
                placeholder="(11) 99999-9999"
                required
              />
              <Input
                label="Celular Secundário"
                value={formData.cell2}
                onChange={(e) => handleChange('cell2', e.target.value)}
                placeholder="(11) 99999-9999"
              />
            </div>
          </CardContent>
        </Card>

        {/* Endereço */}
        <Card>
          <CardHeader>
            <CardTitle>Endereço</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Input
                label="CEP"
                value={formData.zipCode}
                onChange={(e) => handleChange('zipCode', e.target.value)}
                onBlur={(e) => handleCepBlur(e.target.value.replace(/\D/g, ''))}
                placeholder="00000-000"
              />
              <div className="md:col-span-2">
                <Input
                  label="Endereço"
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                />
              </div>
              <Input
                label="Número"
                value={formData.number}
                onChange={(e) => handleChange('number', e.target.value)}
              />
              <Input
                label="Complemento"
                value={formData.complement}
                onChange={(e) => handleChange('complement', e.target.value)}
                placeholder="Apto, Casa, etc."
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
                label="Estado"
                value={formData.state}
                onChange={(e) => handleChange('state', e.target.value)}
                placeholder="SP"
              />
            </div>
          </CardContent>
        </Card>

        {/* CNH */}
        <Card>
          <CardHeader>
            <CardTitle>Carteira de Habilitação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="driver"
                  checked={formData.driver}
                  onChange={(e) => handleChange('driver', e.target.checked)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="driver" className="text-sm font-medium">
                  Possui CNH
                </label>
              </div>
              
              {formData.driver && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    label="Número da CNH"
                    value={formData.cnh}
                    onChange={(e) => handleChange('cnh', e.target.value)}
                  />
                  <Input
                    label="Município da CNH"
                    value={formData.municipalityCnh}
                    onChange={(e) => handleChange('municipalityCnh', e.target.value)}
                  />
                  <Input
                    label="Validade da CNH"
                    type="date"
                    value={formData.cnhValidity}
                    onChange={(e) => handleChange('cnhValidity', e.target.value)}
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Serviços e Taxas */}
        <Card>
          <CardHeader>
            <CardTitle>Serviços e Isenções</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Input
                label="IPI"
                value={formData.ipi}
                onChange={(e) => handleChange('ipi', e.target.value)}
              />
              <Input
                label="ICMS"
                value={formData.icms}
                onChange={(e) => handleChange('icms', e.target.value)}
              />
              <Input
                label="IPVA"
                value={formData.ipva}
                onChange={(e) => handleChange('ipva', e.target.value)}
              />
              <Input
                label="Rodízio"
                value={formData.roadTax}
                onChange={(e) => handleChange('roadTax', e.target.value)}
              />
              <Input
                label="Cartão Defis"
                value={formData.defisCard}
                onChange={(e) => handleChange('defisCard', e.target.value)}
              />
              <div className="md:col-span-2">
                <Input
                  label="Pacote IPI/ICMS/IPVA"
                  value={formData.packageIpiIcmsIpva}
                  onChange={(e) => handleChange('packageIpiIcmsIpva', e.target.value)}
                />
              </div>
              <div className="md:col-span-2">
                <Input
                  label="Pacote IPI/Rodízio/Defis"
                  value={formData.packageIpiRodizioDefis}
                  onChange={(e) => handleChange('packageIpiRodizioDefis', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Botões */}
        <div className="flex space-x-4 pt-4">
          <Button type="submit" loading={loading} className="flex-1 md:flex-none">
            <Save className="h-4 w-4" />
            Salvar Cliente
          </Button>
          <Button 
            type="button" 
            variant="secondary" 
            onClick={() => router.back()}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}
