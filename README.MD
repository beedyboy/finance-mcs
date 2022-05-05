
<!-- localhost:8081/accounts -->
{
    "studentId": "c7465688"
}
{
  "id": 4,
  "studentId": "c7465688",
  "hasOutstandingBalance": false,
  "_links": {
    "self": {
      "href": "http://localhost:8081/accounts/student/c7465688"
    },
    "accounts": {
      "href": "http://localhost:8081/accounts"
    }
  }
}


<!-- localhost:8081/invoices -->

{
    "amount": "432",
    "account":{"studentId": "c7465688"},
    "dueDate": "2022-04-06",
    "type": "LIBRARY_FINE"
}
{
  "id": 7,
  "reference": "QPLPLP2F",
  "amount": 432.0,
  "dueDate": "2022-04-06",
  "type": "LIBRARY_FINE",
  "status": "OUTSTANDING",
  "studentId": "c7465688",
  "_links": {
    "self": {
      "href": "http://localhost:8081/invoices/reference/QPLPLP2F"
    },
    "invoices": {
      "href": "http://localhost:8081/invoices"
    },
    "cancel": {
      "href": "http://localhost:8081/invoices/QPLPLP2F/cancel"
    },
    "pay": {
      "href": "http://localhost:8081/invoices/QPLPLP2F/pay"
    }
  }
}

<!-- localhost:8081/invoices/reference/QPLPLP2F -->
<!-- result as above -->

<!-- http://localhost:8081/invoices/QPLPLP2F/pay -->

{
  "id": 7,
  "reference": "QPLPLP2F",
  "amount": 432.0,
  "dueDate": "2022-04-06",
  "type": "LIBRARY_FINE",
  "status": "PAID",
  "studentId": "c7465688",
  "_links": {
    "self": {
      "href": "http://localhost:8081/invoices/reference/QPLPLP2F"
    },
    "invoices": {
      "href": "http://localhost:8081/invoices"
    }
  }
}