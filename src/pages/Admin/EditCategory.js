import { Divider } from 'antd';
import CategoryForm from '../../components/CategoryForm/CategoryForm';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const EditCategory = () => {
  const { id } = useParams();
  const [category, setCategory] = useState();

  useEffect(() => {
    const getCategory = async () => {
      const res = await axios.get(`https://agency-app-backend.vercel.app/api/category/${id}`);

      if (res.status === 200) {
        setCategory(res.data.data);
      }
    };

    getCategory();
  }, [id]);
  return (
    <div>
      <h2>Chỉnh sửa danh mục</h2>
      <Divider />
      <CategoryForm category={category} />
    </div>
  );
};

export default EditCategory;
