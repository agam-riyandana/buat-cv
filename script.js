document.addEventListener("DOMContentLoaded", () => {
  const themeSelection = document.getElementById("theme-selection")
  const cvForm = document.getElementById("cv-form")
  const cvPreview = document.getElementById("cv-preview")
  const cvContent = document.getElementById("cv-content")
  const downloadPdfBtn = document.getElementById("download-pdf")
  const form = document.getElementById("cv-creator-form")
  let selectedTheme = "simple"

  const mobileMenuButton = document.getElementById("mobile-menu-button")
  const mobileMenu = document.getElementById("mobile-menu")

  mobileMenuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden")
  })

  // Close mobile menu when a link is clicked
  mobileMenu.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      mobileMenu.classList.add("hidden")
    }
  })

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
    const themeStyles = {
      simple: {
        fontFamily: "Arial, sans-serif",
        primaryColor: "#2c3e50",
        secondaryColor: "#34495e",
        backgroundColor: "#ecf0f1",
        accentColor: "#3498db",
      },
      corporate: {
        fontFamily: "Georgia, serif",
        primaryColor: "#2f3640",
        secondaryColor: "#353b48",
        backgroundColor: "#f5f6fa",
        accentColor: "#e74c3c",
      },
      creative: {
        fontFamily: "Verdana, sans-serif",
        primaryColor: "#6c5ce7",
        secondaryColor: "#a29bfe",
        backgroundColor: "#dfe6e9",
        accentColor: "#00b894",
      },
    }

    const style = themeStyles[selectedTheme]

    const template = `
      <style>
        .cv-${selectedTheme} {
          font-family: ${style.fontFamily};
          color: ${style.primaryColor};
          background-color: ${style.backgroundColor};
          padding: 20px;
          max-width: 800px;
          margin: 0 auto;
        }
        .cv-${selectedTheme} h1 {
          color: ${style.accentColor};
          border-bottom: 2px solid ${style.accentColor};
          padding-bottom: 10px;
        }
        .cv-${selectedTheme} h2 {
          color: ${style.secondaryColor};
          border-left: 4px solid ${style.accentColor};
          padding-left: 10px;
          margin-top: 20px;
        }
        .cv-${selectedTheme} .section {
          margin-bottom: 20px;
        }
        .cv-${selectedTheme} .contact-info {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
        }
      </style>
      <div class="cv-${selectedTheme}">
        <h1 class="text-3xl font-bold mb-4">${formData.get("fullName")}</h1>
        <div class="contact-info mb-4">
          <span><i data-lucide="mail" class="inline w-4 h-4 mr-2"></i>${formData.get("email")}</span>
          <span><i data-lucide="phone" class="inline w-4 h-4 mr-2"></i>${formData.get("phone")}</span>
        </div>
        <div class="section">
          <h2 class="text-xl font-bold mt-4 mb-2">Professional Summary</h2>
          <p>${formData.get("summary")}</p>
        </div>
        <div class="section">
          <h2 class="text-xl font-bold mt-4 mb-2">Work Experience</h2>
          <p>${formData.get("experience").replace(/\n/g, "<br>")}</p>
        </div>
        <div class="section">
          <h2 class="text-xl font-bold mt-4 mb-2">Education</h2>
          <p>${formData.get("education").replace(/\n/g, "<br>")}</p>
        </div>
        <div class="section">
          <h2 class="text-xl font-bold mt-4 mb-2">Skills</h2>
          <p>${formData.get("skills")}</p>
        </div>
      </div>
      <div class="mt-4 text-sm text-gray-500">
        Created using CV Creator by v0 AI Assistant
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
        cvContent
          .querySelector(".cv-" + selectedTheme)
          .insertBefore(img, cvContent.querySelector(".cv-" + selectedTheme).firstChild)
      }
      reader.readAsDataURL(photoFile)
    }

    // Reinitialize Lucide icons
    // Assuming lucide is a globally available object or function after importing the library.  If not, you'll need to adjust this line.
    if (typeof lucide !== "undefined") {
      lucide.createIcons()
    } else {
      console.error("Lucide library not found.  Please include it in your HTML.")
    }
  }

  // Download PDF
  downloadPdfBtn.addEventListener("click", () => {
    const element = cvContent
    const html2pdf = window.html2pdf
    html2pdf().from(element).save("my_cv.pdf")
  })
})

