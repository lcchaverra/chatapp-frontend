import { Card } from "primereact/card";


const VideoSide = () => {
  return (
    <div className="col-12 md:col-7">
    <Card title="Clase en Vivo">
      <iframe
        width="100%"
        height="500"
        src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
        title="Simulación de Clase"
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>
    </Card>
  </div>
  )
}

export default VideoSide