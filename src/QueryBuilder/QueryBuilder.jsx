import { useState, useEffect } from 'react';
import { QueryBuilder } from 'react-querybuilder';
import 'react-querybuilder/dist/query-builder.css';
import { sendQueryToApi } from './sendQueryToApi'; 

const fields = [
  { name: 'firstName', label: 'First Name' },
  { name: 'lastName', label: 'Last Name' },
  { name: 'email', label: 'Mail' },
  { name: 'age', label: 'Age', type: 'number', defaultOperator: '>=' },
];

export default () => {
  const [query, setQuery] = useState({
    combinator: 'and', 
    rules: [
      { field: 'firstName', operator: '=', value: '' },
      { field: 'lastName', operator: '=', value: '' },
      { field: 'email', operator: '!=', value: '' },
      { field: 'age', operator: '>=', value: '' },
    ],
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (query.rules.length > 0) {
      sendQueryToApi(query)
        .then((data) => {
          console.log("Processed Query from API:", data); 
          setUsers(data);  
        })
        .catch((error) => {
          console.error("Error while sending query to API:", error);
        });
    }
  }, [query]);

  return (
    <div>
      <h3>Query Builder</h3>
      <QueryBuilder
        fields={fields}
        query={query}
        onQueryChange={setQuery}
      />
      <pre>{JSON.stringify(query, null, 2)}</pre>
      
      {/* Kullanıcıları ekranda göster */}
      <h4>Users:</h4>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.firstName} {user.lastName} - {user.email} - Age: {user.age}
          </li>
        ))}
      </ul>
    </div>
  );
};