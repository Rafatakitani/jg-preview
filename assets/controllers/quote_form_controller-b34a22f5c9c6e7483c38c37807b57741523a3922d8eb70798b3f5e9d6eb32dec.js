import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = {
    number: String
  }

  static targets = [
    "status",
    "photoNote"
  ]

  submit(event) {
    event.preventDefault()

    const form = event.target

    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }

    const name = form.elements.name?.value?.trim()
    const phone = form.elements.phone?.value?.trim()
    const environment = form.elements.environment?.value?.trim()
    const location = form.elements.location?.value?.trim()
    const measurements = form.elements.measurements?.value?.trim() || "Não informadas"
    const description = form.elements.description?.value?.trim() || "Não informada"

    const message = `Olá! Gostaria de solicitar um orçamento para um móvel planejado.\n\nNome: ${name}\nWhatsApp: ${phone}\nAmbiente: ${environment}\nLocal: ${location}\nMedidas aproximadas: ${measurements}\nDescrição: ${description}\n\nTenho fotos ou planta do ambiente e posso enviar pelo WhatsApp.`

    const url = `https://wa.me/${this.numberValue}?text=${encodeURIComponent(message)}`

    this.statusTarget.textContent = "Abrindo o WhatsApp… Envie as fotos ou a planta diretamente na conversa do WhatsApp."
    this.statusTarget.classList.remove("hidden")

    const whatsappWindow = window.open(url, "_blank", "noopener")

    if (!whatsappWindow) {
      window.location.href = url
    }
  }

  onPhotoChange(event) {
    const input = event.target
    const fileName = input.files?.[0]?.name

    if (fileName) {
      this.photoNoteTarget.textContent = `Arquivo: ${fileName}`
      this.photoNoteTarget.classList.remove("hidden")
    } else {
      this.photoNoteTarget.classList.add("hidden")
      this.photoNoteTarget.textContent = ""
    }
  }
};
