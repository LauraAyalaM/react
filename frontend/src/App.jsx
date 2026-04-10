import { useEffect, useState } from "react";
// Componente principal de la aplicación
function App(){
  // Estado para guardar el mensaje que viene del backend
  const [mensaje, setMensaje] = useState("");
  const [mensajeJuego, setMensajeJuego] = useState("Haz clic en Reiniciar para comenzar");
  const [numero, setNumero] = useState("");
  // Hook que se ejecuta una sola vez al cargar el componente
  useEffect(() => {
  // Hace una peticion GET al backend
    fetch("/api/mensaje")
      // Convierte la respuesta a JSON
      .then(res => res.json())
      // Guarda el texto de la respuesta en el estado 'mensaje'
      .then(data => setMensaje(data.texto));

  // El array vacio asegura que se ejecute solo al montar el componente
  },[]);

  const reiniciarJuego =async()=>{
      const res= await fetch("/api/start");
      const data= await res.json();
      // console.log("Número secreto(solo consola frontend):",data.numeroSecreto);
      setMensajeJuego(data.mensaje);
      setNumero("");
  };

  // Funcion para enviar intento (Adivina el Numero)
const enviarIntento = async () => {
  if (!numero) return;
  const res = await fetch("/api/guess", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ numero: Number(numero) }),
    })

  const data = await res. json();
  setMensajeJuego(data.mensaje);
}
// Renderiza el contenido en pantalla
return (
  <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", textAlign: "center" }}>

    {/* SECCIÓN BACKEND */}
    <h1 style={{ color: "#2d3436" }}>Frontend conectado</h1>
    <p style={{ fontSize: "1.2rem", color: "#0984e3" }}>
      {mensaje}
    </p>

    <hr style={{ margin: "20px 0" }} />

    {/* SECCIÓN ADIVINA EL NÚMERO */}
    <h1>Juego: Adivina el Número</h1>
    <p style={{ fontSize: "1.2rem", color: "#d63031" }}>
      {mensajeJuego}
    </p>

    {/* Input */}
    <input
      type="number"
      value={numero}
      onChange={(e) => setNumero(e.target.value)}
      placeholder="Escribe un número"
      style={{
        padding: "10px 15px",
        fontSize: "1rem",
        borderRadius: "8px",
        border: "2px solid #0984e3",
        width: "150px",
        textAlign: "center",
        marginBottom: "15px"
      }}
    />

    <br />

    <button
      onClick={enviarIntento}
      style={{
        padding: "10px 20px",
        marginRight: "10px",
        fontSize: "1rem",
        borderRadius: "8px",
        border: "none",
        backgroundColor: "#00b894",
        color: "#fff",
        cursor: "pointer",
        transition: "background-color 0.3s"
      }}
      onMouseOver={(e) => e.target.style.backgroundColor = "#019875"}
      onMouseOut={(e) => e.target.style.backgroundColor = "#00b894"}
    >
      Intentar
    </button>
    <button
      onClick={reiniciarJuego}
      style={{
        padding: "10px 20px",
        fontSize: "1rem",
        borderRadius: "8px",
        border: "none",
        backgroundColor: "#0984e3",
        color: "#fff",
        cursor: "pointer",
        transition: "background-color 0.3s"
      }}
      onMouseOver={(e) => e.target.style.backgroundColor = "#0652dd"}
      onMouseOut={(e) => e.target.style.backgroundColor = "#0984e3"}
    >
      Reiniciar Juego
    </button>

  </div>
);
}

export default App;