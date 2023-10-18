import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [record, setRecord] = useState([]);
  const [editid, setEditid] = useState("");

  const onsubmit = () => {
    if (editid) {
      axios.put(`https://realtime-98a24-default-rtdb.firebaseio.com/data/${editid}.json`, {
        name: name,
        email: email,
        phone: phone
      }).then((res) => {
        setName("");
        setEmail("");
        setPhone("");
        getView();
      }).catch((err) => {
        return false;
      })
    } else {
      axios.post(`https://realtime-98a24-default-rtdb.firebaseio.com/data.json`, {
        name: name,
        email: email,
        phone: phone
      }).then((res) => {
        setName("");
        setEmail("");
        setPhone("");
        getView();
      }).catch((err) => {
        return false;
      })
    }
  }

  const getView = () => {
    axios.get(`https://realtime-98a24-default-rtdb.firebaseio.com/data.json`)
      .then((res) => {
        let data = res.data;
        let record = [];
        for (let i in data) {
          record.unshift({
            ...data[i], id: i
          });
        }
        setRecord(record);
      }).catch((err) => {
        return false;
      })
  }

  const ondelete = (id) => {
    axios.delete(`https://realtime-98a24-default-rtdb.firebaseio.com/data/${id}.json`)
      .then((res) => {
        getView();
      }).catch((err) => {
        return false;
      })
  }

  const onedit = (id, name, email, phone) => {
    setEditid(id);
    setName(name);
    setEmail(email);
    setPhone(phone);
  }

  useEffect(() => {
    getView();
  }, [])

  return (
    <div className='table' style={{ display: "grid", justifyContent: "center",paddingTop:"100px" }}>
      <div style={{ padding: "100px 50px", display: "flex", justifyContent: "center" ,}}>
        <div style={{ height: "100", display: "flex", justifyContent: "center" }}>
          <table>
            <tbody style={{backgroundColor:"transparent"}}>
              <tr>
                <td>Name</td>
              </tr>
              <tr>
                <td><input type='text' name='name' onChange={(e) => setName(e.target.value)} placeholder="Enter Your Name" value={name} style={{ height: "30px", margin:"0 0 10px 0",paddingLeft:"20px",outline:"none"}} /></td>
              </tr>
              <tr>
                <td>Email :-</td>
              </tr>
              <tr>
                <td><input type='text' name='email' onChange={(e) => setEmail(e.target.value)} placeholder="Enter Your Email" value={email} style={{ height: "30px", margin:"0 0 10px 0",paddingLeft:"20px",outline:"none"}}/></td>
              </tr>
              <tr>
                <td>Phone :-</td>
              </tr>
              <tr>
                <td><input type='text' name='phone' onChange={(e) => setPhone(e.target.value)} placeholder="Enter Your Phone" value={phone} style={{ height: "30px" ,margin:"0 0 20px 0",paddingLeft:"20px",outline:"none"}}/></td>
              </tr>
              <tr>
                <td></td>
              </tr>
              <tr>
                <td>
                  {
                    editid ? (<button onClick={() => onsubmit()} style={{ marginRight: "20px", width: "60px", height: "30px"}}>Edit</button>)
                      : (<button onClick={() => onsubmit()} style={{ marginRight: "20px", width: "60px", height: "30px"}}>Submit</button>)
                  }
                </td>
              </tr>
            </tbody>
          </table>
          <table cellPadding={20} cellSpacing={0}>
            <thead >
              <tr>
                <th style={{ borderBottom: "2px solid #fff" }}>Id</th>
                <th style={{ borderBottom: "2px solid #fff" }}>Name</th>
                <th style={{ borderBottom: "2px solid #fff" }}>Email</th>
                <th style={{ borderBottom: "2px solid #fff" }}>Phone</th>
                <th style={{ borderBottom: "2px solid #fff" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                record.map((val) => {
                  const { id, name, phone, email } = val
                  return (
                    <tr>
                      <td>{id}</td>
                      <td>{name}</td>
                      <td>{email}</td>
                      <td>{phone}</td>
                      <td>
                        <button onClick={() => ondelete(id)} style={{ margin: "0 10px", width: "60px", height: "30px"}}>Delete</button>
                        <button onClick={() => onedit(id, name, email, phone)} style={{ margin: "0 10px", width: "60px", height: "30px", borderRadius: "20px" }}>Edit</button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;