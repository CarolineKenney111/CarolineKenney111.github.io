// Problem 1: Create JSON for each employee
const employees = [
    { firstName: "Sam", department: "Tech", designation: "Manager", salary: 40000, raiseEligible: true },
    { firstName: "Mary", department: "Finance", designation: "Trainee", salary: 18500, raiseEligible: true },
    { firstName: "Bill", department: "HR", designation: "Executive", salary: 21200, raiseEligible: false }
  ];
  console.log("Problem 1", { employees });
  
  // Problem 2: Create JSON for the company
  const company = {
    companyName: "Tech Stars",
    website: "www.techstars.site",
    employees: employees
  };
  console.log("Problem 2", { company });
  
  // Problem 3: Add new employee Anna
  const anna = { firstName: "Anna", department: "Tech", designation: "Executive", salary: 25600, raiseEligible: false };
  company.employees.push(anna);
  console.log("Problem 3", { employees: company.employees });
  
  // Problem 4: Calculate total salary
  let totalSalary = 0;
  for (let employee of company.employees) {
    totalSalary += employee.salary;
  }
  console.log("Problem 4 Total salary for all company employees:", totalSalary);
  
  // Problem 5: Apply raises
  function applyRaises(company) {
    for (let emp of company.employees) {
      if (emp.raiseEligible) {
        emp.salary *= 1.10;
        emp.raiseEligible = false;
      }
    }
  }
  applyRaises(company);
  console.log("Problem 5", { employees: company.employees });
  
  // Problem 6: Add WFH info
  const wfhEmployees = ['Anna', 'Sam'];
  for (let emp of company.employees) {
    emp.wfh = wfhEmployees.includes(emp.firstName);
  }
  console.log("Problem 6", { employees: company.employees });
  