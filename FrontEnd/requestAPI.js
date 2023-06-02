// API request to display works.
async function fetchWorks() {
  const r = await fetch("http://localhost:5678/api/works");
  
  if (r.ok === true) {
    const data = await r.json();
    console.log(data);
    return data;
  } else {
    console.error("Erreur:", r.status);
  }
}

// API request to display categories.
async function fetchCategories() {
  const r = await fetch("http://localhost:5678/api/categories");

  if (r.ok === true) {
    return r.json();
  } else {
    console.error("Erreur:", r.status);
  }
}

// API request to get ID and Token.
async function fetchLogin() {
  const emailInput = document.querySelector(".email-input");
  const passwordInput = document.querySelector(".password-input");
  const user = {
    email: emailInput.value,
    password: passwordInput.value,
  };

  const r = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const result = await r.json();
  sessionStorage.setItem("admin", JSON.stringify(result));
  if (r.ok === true) {
    sessionStorage.setItem("connected", true);
    adminConnected();
  } else {
    console.error("Erreur:", r.status);
    loginError();
  }
}

// API request to delete a work.
async function deleteWork(workId) {
  const r = await fetch(`http://localhost:5678/api/works/${workId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (r.ok) {
   await fetchWorks();
  } else {
    console.error("Erreur:", r.status);
  }
}

// To post a new work.
async function uploadData(formData) {
  try {
    const response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();

    return { ok: response.ok, data };
  } catch (error) {
    return { ok: false, error: error.message };
  }
}
