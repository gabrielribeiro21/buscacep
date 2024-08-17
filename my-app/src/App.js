import React from 'react';
import {FiSearch} from 'react-icons/fi'
import './style.css';
import api from './services/api'

function App() {

  const [input, setInput] = React.useState("")
  const [cep, setCep] = React.useState({})

  async function handleSearch() {
    // 01001000/json/
    
    if(input === ''){
      return alert('Preencha algum cep')
    }
    
    try{
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput("")
    }
    catch{
      alert('Ops erro ao buscar')
      setInput("")
  }

  }

  return (
    <div className='container'>
      <h1 className='title'>Buscador CEP</h1>
      <div className='containerInput'>
        <input type="text" id="cep" name="cep" placeholder="Digite seu cep... "
        value={input}
        onChange={(e) => setInput(e.target.value)}/>

        <button className='buttonSearch' onClick={handleSearch}>
          <FiSearch size={20} color="#000"/>
        </button>
      </div>


    {/* usamos o object para confirmar se tem algo na tela */}
      {Object.keys(cep).length > 0 && (
        <section className='section'>
        <h2>CEP: {cep.cep}</h2>

        <span>{cep.logradouro}</span>
        <span>Complemento: {cep.complemento}</span>
        <span>{cep.bairro}</span>
        <span>{cep.localidade} - {cep.uf}</span>

      </section>
      )}
      

    </div>
  );
}

export default App;
