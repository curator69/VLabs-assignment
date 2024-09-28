fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    const tableBody = document.querySelector("#chemicalTable tbody");
    const populateTable = (data) => {
      tableBody.innerHTML = "";
      data.forEach((row) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
                    <td>${row.id}</td>
                    <td>${row.chemicalName}</td>
                    <td>${row.vendor}</td>
                    <td>${row.density}</td>
                    <td>${row.viscosity}</td>
                    <td>${row.packaging}</td>
                    <td>${row.packSize}</td>
                    <td>${row.unit}</td>
                    <td>${row.quantity}</td>
                `;
        tableBody.appendChild(tr);
      });
    };

    populateTable(data);

    window.sortTable = (columnIndex) => {
      const ascending = document
        .querySelectorAll("th")
        [columnIndex].classList.contains("asc");
      const sortedData = [...data].sort((a, b) => {
        const valA = Object.values(a)[columnIndex];
        const valB = Object.values(b)[columnIndex];
        if (typeof valA === "number" && typeof valB === "number") {
          return ascending ? valA - valB : valB - valA;
        } else {
          return ascending
            ? valA.localeCompare(valB)
            : valB.localeCompare(valA);
        }
      });

      document
        .querySelectorAll("th")
        .forEach((th) => th.classList.remove("asc", "desc"));
      document
        .querySelectorAll("th")
        [columnIndex].classList.add(ascending ? "desc" : "asc");

      populateTable(sortedData);
    };
  });
