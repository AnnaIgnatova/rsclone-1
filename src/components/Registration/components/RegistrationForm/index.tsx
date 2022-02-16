import "antd/dist/antd.css";
import "./style.css";
import { Form, Input, Button } from "antd";
import { useState } from "react";
import { useHttp } from "../../../../hooks/http.hooks";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const RegistrationForm = () => {
  const { loading, request } = useHttp();
  const [forms, setForm] = useState({
    email: "",
    password: "",
    name: "",
    surname: "",
    phone: "",
  });

  const changeHandler = (event: {
    target: { name: string; value: string };
  }) => {
    setForm({ ...forms, [event.target.name]: event.target.value });
  };

  const reqisterHandler = async () => {
    try {
      await request("register", "POST", { ...forms });
    } catch (error) {
      console.log(error);
    }
  };

  const [form] = Form.useForm();

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      className="registration__form"
      initialValues={{
        prefix: "375",
      }}
      scrollToFirstError
    >
      <Form.Item
        name="name"
        label="Имя"
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите свое имя!",
            whitespace: true,
          },
        ]}
      >
        <Input name="name" placeholder="Введите имя" onChange={changeHandler} />
      </Form.Item>
      <Form.Item
        name="surname"
        label="Фамилия"
        rules={[
          {
            message: "Пожалуйста, введите свою фамиилю!",
            whitespace: true,
          },
        ]}
      >
        <Input
          name="surname"
          placeholder="Введите фамилию"
          onChange={changeHandler}
        />
      </Form.Item>
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "Некорректный E-mail!",
          },
          {
            required: true,
            message: "Введите E-mail!",
          },
        ]}
      >
        <Input
          name="email"
          placeholder="Введите E-mail"
          onChange={changeHandler}
        />
      </Form.Item>

      <Form.Item
        name="password"
        label="Пароль"
        rules={[
          {
            required: true,
            message: "Введите пароль!",
          },
        ]}
        hasFeedback
      >
        <Input.Password
          name="password"
          placeholder="Введите пароль"
          onChange={changeHandler}
        />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Повторите пароль"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Повторите пароль!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Пароли не совпадают!"));
            },
          }),
        ]}
      >
        <Input.Password placeholder="Повторите пароль" />
      </Form.Item>
      <Form.Item
        name="phone"
        label="Номер телефона"
        rules={[{ message: "Введите номер телефона!" }]}
      >
        <Input
          name="phone"
          placeholder="Введите номер телефона"
          style={{ width: "100%" }}
          onChange={changeHandler}
        />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button
          type="primary"
          htmlType="submit"
          className="registration-button"
          onClick={reqisterHandler}
          disabled={loading}
        >
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegistrationForm;
