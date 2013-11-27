package main

import (
    "encoding/json"
    "net/http"
    "log"
    "github.com/gorilla/mux"
    "code.google.com/p/go.crypto/bcrypt"
    r "github.com/dancannon/gorethink"
)

type Account struct {
    Id string `json:"id"`
    FirstName string `json:"firstName"`
    LastName string `json:"lastName"`
    Email string `json:"email"`
    OrganizationId string `json:"organizationId"`
    OutOfTown bool `json:"outOfTown"`
}

type Incident struct {
    Id string `json:"id"`
    Name string `json:"name"`
    Date string `json:"date"`
    OrganizationId string `json:"organizationId"`
}

type Response struct {
    Id string `json:"id"`
    IncidentId string `json:"incidentId"`
    ResponderId string `json:"responderId"`
    Message string `json:"message"`
    Status int `json:"status"`
}

type OptArgs map[string]interface{}

var session *r.Session
const (
    accountId = "477d269c-cb2a-4a21-ab2e-32055068e016"
    orgId = "1236c86b-2330-47ff-8697-abdf89a48a9d"
)

func main() {
    log.Println("Starting server")

    // Connect to db
    var err error
    session, err = r.Connect(map[string]interface{}{
        "address": "localhost:28015",
        "database": "response",
    })
    if err != nil {
        log.Fatal(err)
        return
    }

    router := mux.NewRouter()

    // Routes
    router.HandleFunc("/api/account", AccountHandler).Methods("GET")
    router.HandleFunc("/api/account", NewAccountHandler).Methods("POST")
    router.HandleFunc("/api/incidents", IncidentsHandler).Methods("GET")
    router.HandleFunc("/api/incidents/{id}", IncidentHandler).Methods("GET")
    router.HandleFunc("/api/incidents/{id}/responses", ResponsesHandler).Methods("GET")
    http.Handle("/", http.FileServer(http.Dir("./static/")))
    http.Handle("/api/", router)

    log.Println("Listening on 5000")
    http.ListenAndServe(":5000", nil)
}

func AccountHandler(resp http.ResponseWriter, req *http.Request) {
    var acc Account
    row, _ := r.Table("accounts").Get(accountId).RunRow(session)
    if row.IsNil() {
        http.NotFound(resp, req)
        return
    }
    row.Scan(&acc)

    j, _ := json.Marshal(acc)
    resp.Header().Set("Content-Type", "application/json")
    resp.Write(j)
}

func NewAccountHandler(resp http.ResponseWriter, req *http.Request) {
    pw, err := bcrypt.GenerateFromPassword([]byte(req.FormValue("password")), 10)
    if err != nil {
        http.Error(resp, err.Error(), http.StatusInternalServerError)
        return
    }
    log.Println("Create account")
    log.Println(pw)
    http.Redirect(resp, req, "/signup.html", http.StatusFound)
}

func IncidentsHandler(resp http.ResponseWriter, req *http.Request) {
    incidents := getIncidents(orgId)

    j, _ := json.Marshal(incidents)
    resp.Header().Set("Content-Type", "application/json")
    resp.Write(j)
}

func IncidentHandler(resp http.ResponseWriter, req *http.Request) {
    id := mux.Vars(req)["id"]
    incident := getIncident(id)

    j, _ := json.Marshal(incident)
    resp.Header().Set("Content-Type", "application/json")
    resp.Write(j)
}

func ResponsesHandler(resp http.ResponseWriter, req *http.Request) {
    incidentId := mux.Vars(req)["id"]
    responses := getResponses(incidentId)

    j, _ := json.Marshal(responses)
    resp.Header().Set("Content-Type", "application/json")
    resp.Write(j)
}

func getIncidents(id string) (is []Incident) {
    rows, _ := r.Table("incidents").Filter(OptArgs{"organizationId": id}).Run(session)
    for rows.Next() {
        var incident Incident
        rows.Scan(&incident)
        is = append(is, incident)
    }
    return
}

func getIncident(id string) (i Incident) {
    row, _ := r.Table("incidents").Get(id).RunRow(session)
    row.Scan(&i)
    return
}

func getResponses(id string) (rs []Response) {
    rows, _ := r.Table("responses").Filter(OptArgs{"incidentId": id}).Run(session)
    for rows.Next() {
        var response Response
        rows.Scan(&response)
        rs = append(rs, response)
    }
    return
}
