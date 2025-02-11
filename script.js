document.addEventListener("DOMContentLoaded", () => {
  const themeSelection = document.getElementById("theme-selection")
  const cvForm = document.getElementById("cv-form")
  const cvPreview = document.getElementById("cv-preview")
  const cvContent = document.getElementById("cv-content")
  const downloadPdfBtn = document.getElementById("download-pdf")
  const form = document.getElementById("cv-creator-form")
  let selectedTheme = "simple"

  // Theme selection
  themeSelection.addEventListener("click", (e) => {
    if (e.target.closest(".theme-option")) {
      selectedTheme = e.target.closest(".theme-option").dataset.theme
      themeSelection.classList.add("hidden")
      cvForm.classList.remove("hidden")
    }
  })

  // Form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault()
    const formData = new FormData(form)
    generateCV(formData)
  })

  // Generate CV
  function generateCV(formData) {
    const template = `
            <div class="cv-${selectedTheme}">
                <h1 class="text-3xl font-bold mb-4">${formData.get("fullName")}</h1>
                <p class="mb-2">${formData.get("email")} | ${formData.get("phone")}</p>
                <h2 class="text-xl font-bold mt-4 mb-2">Professional Summary</h2>
                <p>${formData.get("summary")}</p>
                <h2 class="text-xl font-bold mt-4 mb-2">Work Experience</h2>
                <p>${formData.get("experience").replace(/\n/g, "<br>")}</p>
                <h2 class="text-xl font-bold mt-4 mb-2">Education</h2>
                <p>${formData.get("education").replace(/\n/g, "<br>")}</p>
                <h2 class="text-xl font-bold mt-4 mb-2">Skills</h2>
                <p>${formData.get("skills")}</p>
            </div>
        `

    cvContent.innerHTML = template
    cvForm.classList.add("hidden")
    cvPreview.classList.remove("hidden")

    // Handle photo upload
    const photoFile = formData.get("photo")
    if (photoFile.size > 0) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const img = document.createElement("img")
        img.src = e.target.result
        img.classList.add("w-32", "h-32", "rounded-full", "mb-4")
        cvContent.insertBefore(img, cvContent.firstChild)
      }
      reader.readAsDataURL(photoFile)
    }
  }

  // Download PDF
  downloadPdfBtn.addEventListener("click", () => {
    const element = cvContent
    // Import html2pdf library.  This needs to be done before the function is called.  The method of importing will depend on your project setup (e.g., using a module bundler like Webpack or importing a CDN script).
    // Example using a CDN:  This assumes you have included the html2pdf library in your HTML file via a <script> tag.
    html2pdf().from(element).save("my_cv.pdf")
  })
})

