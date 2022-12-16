import loadingGif from "/loading.gif"

const Modal = () => {
  return (
    <div className="modal-loading bg-light bg-opacity-50">
      <img src={loadingGif} alt="loading" />
    </div>
  )
}

export default Modal