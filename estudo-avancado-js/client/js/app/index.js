"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var campos, form, tbody;
    return {
        setters: [],
        execute: function () {
            campos = [document.querySelector("#data"), document.querySelector("#quantidade"), document.querySelector("#valor")];
            form = document.querySelector(".form");
            tbody = document.querySelector("table tbody");


            form.addEventListener("submit", function (event) {
                event.preventDefault();

                var tr = document.createElement("tr");

                campos.forEach(function (campo) {
                    var td = document.createElement("td");
                    td.textContent = campo.value;

                    tr.appendChild(td);
                });

                var tdVolume = document.createElement("td");
                tdVolume.textContent = campos[1].value * campos[2].value;

                tr.appendChild(tdVolume);
                tbody.appendChild(tr);

                form.reset();
            });
        }
    };
});
//# sourceMappingURL=index.js.map