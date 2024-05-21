// Seleciona o botão "Cadastrar" corretamente
const cadastrarButton = document.querySelector('#Cadastrar');

// Adiciona um ouvinte de evento ao botão "Cadastrar"
cadastrarButton.addEventListener('click', function() {
    // Chama a função exportToExcel(), que vai coletar os dados do formulário, criar o arquivo Excel e baixá-lo
    exportToExcel();
});
document.addEventListener("DOMContentLoaded", function() {
    // Ouvinte de evento para o botão "Cadastrar"
    document.getElementById("Cadastrar").addEventListener("click", function() {
        // Verifica se o formulário está preenchido antes de prosseguir
        if (!isFormFilled()) {
            alert("Por favor, preencha o formulário antes de cadastrar.");
            return;
        }
        exportToExcel();
    });
});

// Função para verificar se o formulário está preenchido
function isFormFilled() {
    const inputs = document.querySelectorAll("form input, form select, form textarea");
    for (let input of inputs) {
        if (!input.value) {
            return false; // Se algum campo estiver vazio, retorna false
        }
    }
    return true; // Se todos os campos estiverem preenchidos, retorna true
}


// Função para adicionar cadastro na tabela
function adicionarCadastroNaTabela(Cadastrar) {
    var tabela = document.getElementById("ultimas-inscricoes");
    var row = tabela.insertRow(1); // Insere na segunda linha (após o cabeçalho)
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.textContent = Cadastrar.nome;
    cell2.textContent = Cadastrar.idade;
    cell3.textContent = Cadastrar.email;

    // Chamada para o módulo Python que salva os dados do cadastro
    fetch('C://Desenvolvimento//comudFHub//Descktop//cadMem//spreadsheets//spreadsheets//gerador_excel.py', {
        method: 'POST',
        body: JSON.stringify(Cadastrar),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao salvar cadastro.');
        }
        return response.json();
    })
    .then(data => {
        console.log('Cadastro salvo com sucesso:', data);
    })
    .catch(error => {
        console.error('Erro ao salvar cadastro:', error);
    });
}

// Função para coletar os dados do formulário
function getFormData() {
    const formData = new FormData(document.querySelector('form'));
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    return data;
}

// Create an Excel file from the form data
function createExcelFile(data) {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, "cadmem.xslx");
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    return excelBuffer;
}

// Download the Excel file
function downloadExcelFile(excelBuffer) {
    const fileName = "dados_membros.csv.xlsx";
    const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    URL.revokeObjectURL(url);
}

// Função para adicionar campos de filho
function adicionar_filho() {
    const filhoContainer = document.querySelector(".adicionar_filho");
    const newFieldset = document.createElement("fieldset");
    newFieldset.innerHTML = `
        <label for="filho">Nome do Filho:</label>
        <input type="text" id="filho" name="filho[]" placeholder="Nome do Filho." required><br>
        <label for="data_nascimento_filho">Data de Nascimento:</label>
        <input type="date" id="data_nascimento_filho" name="data_nascimento_filho[]" placeholder="Data de Nascimento" required>
    `;
    filhoContainer.appendChild(newFieldset);
}

// Função principal para exportar para o Excel
function exportToExcel() {
    try {
        const data = getFormData();
        
        // Verifica se existem dados no formulário
        if (Object.keys(data).length === 0) {
            // Se não houver dados, exibe uma mensagem de alerta
            alert("Nenhum cadastro foi realizado. Por favor, preencha o formulário antes de exportar para o Excel.");
            return false;
        }
        
         // Envia os dados para o servidor Python
         fetch( 'http://localhost:5000/', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao exportar dados para Excel.');
            }
            return response.json();
        })
        .then(data => {
            // Se a resposta do servidor incluir o caminho do arquivo Excel, você pode fazer algo com ele aqui
            console.log('Caminho do arquivo Excel:', data.excel_path);
        })
        .catch(error => {
            console.error('Erro ao exportar dados para Excel:', error);
        });

        return true;
    } catch (error) {
        console.error('Erro ao exportar dados para Excel:', error);
        return false;
    }
}

// Ouvinte de evento para o botão "Adicionar Filho"
document.getElementById("adicionar_filho").addEventListener("click", function() {
    adicionar_filho();
});





  



