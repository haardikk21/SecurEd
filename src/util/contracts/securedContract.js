const address = "0x7b7d708b2a09422750fba76fe05826074997dcfa";
const ABI = JSON.parse(`[
	{
		"constant": false,
		"inputs": [
			{
				"name": "courseId",
				"type": "uint256"
			}
		],
		"name": "enrollInCourse",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "to",
				"type": "address"
			},
			{
				"name": "courseId",
				"type": "uint256"
			},
			{
				"name": "grade",
				"type": "uint256"
			}
		],
		"name": "issueCertificate",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getCertificate",
		"outputs": [
			{
				"name": "courseId",
				"type": "uint256"
			},
			{
				"name": "gradeObtained",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getCertificateIds",
		"outputs": [
			{
				"name": "",
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getEnrolledCourses",
		"outputs": [
			{
				"name": "",
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]`);
export { address, ABI };
