const HealthRecordAbi = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_patientName",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_age",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_gender",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_phNo",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_bloodType",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_location",
        "type": "string"
      }
    ],
    "name": "insertPatient",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_pid",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_hospitalName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_doctorName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_speciality",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_referredBy",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_complaints",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_investigatinAdvise",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_medicineAdvice",
        "type": "string"
      }
    ],
    "name": "insertRecord",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getpid",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "Patient",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "pid",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "patientName",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "age",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "gender",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "phNo",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "bloodType",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "location",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "pid",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "Records",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "pid",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "hospitalName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "doctorName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "speciality",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "referredBy",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "complaints",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "investigatinAdvise",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "medicineAdvice",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];
const HealthRecordAddress = "0x4e95488b28248870963d8f2f23033ff1406bd1a5";

//get pid
// Function to retrieve the input value from the URL
function getParameterValue(name) {
  var urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}
const bData = [];

async function accessrecord() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const HealthRecordContract = new ethers.Contract(HealthRecordAddress, HealthRecordAbi, provider);
  const patientid = getParameterValue('value');

  const data = await HealthRecordContract.Patient(patientid);
 

  insertinformationtable(data.patientName, data.pid, data.age, data.gender, data.bloodType, data.phNo, data.location);
  
  for (let i = 0; i < 10; i++) {
    const data = await HealthRecordContract.Records(i);
    if (patientid == data.pid) {
      bData.push({ HospitalName: data.hospitalName, DoctorName: data.doctorName, speciality: data.speciality, referredBy: data.referredBy, complaints: data.complaints, investigatinAdvise: data.investigatinAdvise, medicineAdvice: data.medicineAdvice });
    }
  }
  window.location.href = "records.html";
}
function insertinformationtable(pname, pid, page, pgender, pblood, phno, plocation) {
  const tableEL = document.getElementById('info');
  const title = document.getElementById('title');
  const healding1 = document.createElement('h1');
  healding1.innerText = "Personal Information";
  const head = document.getElementById('personal-information');
  head.appendChild(healding1);
  if(pid==0)
  {
    const title = document.getElementById('title');
    title.innerText = "Patient Doesn't Exist, try again.";
  }
  else
  {
  tableEL.innerHTML += '<tr><th>Patient Name:</th><td>' + pname + '</td></tr><tr><th>Patient ID:</th><td>' + pid + '</td></tr><tr><th>Age:</th><td>' + page + '</td></tr><tr><th>Gender:</th><td>' + pgender + '</td></tr><tr><th>Blood Type:</th><td>' + pblood + '</td></tr><tr><th>Mobile Number:</th><td>' + phno + '</td></tr><tr><th>Location:</th><td>' + plocation + '</td></tr>';
  title.innerText = "Medical History of " + pname;
  }
}
accessrecord();

// Define your blockchain data
console.log(bData);

const description = document.querySelector(".description");
function chain()
{ // Create blockchain visualization
  const blockchain = document.querySelector(".blockchain");
  blockchain.innerHTML="";
  const trecords= document.getElementById("record");
  const line= document.getElementById("dd");
  line.innerText="Select a block to view its content.";
  bData.forEach((blockData, i) => {
    const block = document.createElement("div");
    block.className = "block bi bi-filter-square";
    block.addEventListener("click", () => {
      
      trecords.innerHTML = '<tr><th>Hospital Name:</th><td>' + blockData.HospitalName + '</td></tr><tr><th>Doctor Name:</th><td>' + blockData.DoctorName + '</td></tr><tr><th>Speciality:</th><td>' + blockData.speciality + '</td></tr><tr><th>Referred By:</th><td>' + blockData.referredBy + '</td></tr><tr><th>Complaints:</th><td>' + blockData.complaints + '</td></tr><tr><th>Investigation Advise:</th><td>' + blockData.investigatinAdvise + '</td></tr><tr><th>Medicine Advice:</th><td>' + blockData.medicineAdvice + '</td></tr><br>';
    });
    blockchain.appendChild(block);

    if (i < bData.length - 1) {
      const connector = document.createElement("div");
      connector.className = "connector";
      blockchain.appendChild(connector);
    }
  });
}
  