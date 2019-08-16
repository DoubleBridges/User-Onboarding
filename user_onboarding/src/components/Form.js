import React, { useState, useEffect } from 'react'
import axios from 'axios'
import * as Yup from 'yup'
import { Form, Field, withFormik } from 'formik'



const MyForm = ({ errors, touched, values, status }) => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (status) {
      setUsers([...users, status])
    }
  }, [status])


  return (
    <>
      <Form>
        <Field
          type='text'
          name='name'
          placeholder='Name'
        />
        {touched.name && errors.name && (
          <p className='error'>{errors.name}</p>
        )}
        <Field
          type='text'
          name='email'
          placeholder='Email'
        />
        {touched.email && errors.email && <p className='error'>{errors.email}</p>}
        <Field
          type='password'
          name='password'
          placeholder='Password'
        />
        {touched.password && errors.password && <p className='error'>{errors.password}</p>}
        <label className='ckeckbox-container'>
          Please agree to the Terms of Service
        <Field
            type='checkbox'
            name='tos'
            checked={values.tos}
          />
        </label>
        {touched.tos && errors.tos && <p className='error'>{errors.tos}</p>}

        <button type='submit'>Submit</button>
      </Form>
      {console.log(users)}
      {users.map(user => (<p key={user.id}>{user.name}</p>))}
    </>
  )
}

const SignUpForm = withFormik({
  mapPropsToValues({ name, email, password, tos }) {
    return {
      name: name || '',
      email: email || '',
      password: password || '',
      tos: tos
    }
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required('Field Required'),
    email: Yup.string().required('Field Required'),
    password: Yup.string().required('Field Required'),
    tos: Yup.boolean().oneOf([true], "Must Use")
  }),
  handleSubmit(values, { setStatus, resetForm }) {
    axios
      .post("https://reqres.in/api/users", values)
      .then(res => {
        setStatus(res.data)
        // console.log(res.data)
      })
      .catch(err => console.log(err))
    resetForm()
  }
})(MyForm)

export default SignUpForm