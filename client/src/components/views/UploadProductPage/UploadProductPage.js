import React, { useState } from 'react';
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import FileUpload from '../../utils/FileUpload';
import Axios from 'axios';

const { Title } = Typography;
const { TextArea } = Input;

const Spirits = [
  { key: 1, value: 'Vodka' },
  { key: 2, value: 'Rum' },
  { key: 3, value: 'Gin' },
  { key: 4, value: 'Tequila' },
  { key: 5, value: 'Whisky' },
  { key: 6, value: 'Brandy' },
  { key: 7, value: 'Mezcal' },
];

const TypeOfDrinks = [
  { key: 8, value: 'Classic' },
  { key: 9, value: 'Sweet' },
  { key: 9, value: 'Sweet & Sour' },
  { key: 10, value: 'Sour' },
  { key: 11, value: 'Citric' },
  { key: 12, value: 'Refreshing' },
  { key: 13, value: 'Nonalcaholic' },
  { key: 14, value: 'Tropical' },
  { key: 15, value: 'Creamy' },
  { key: 16, value: 'Frozen' },
  { key: 17, value: 'Martini' },
];

function UploadProductPage(props) {
  const [TitleValue, setTitleValue] = useState('');
  const [DescriptionValue, setDescriptionValue] = useState('');
  const [PriceValue, setPriceValue] = useState(0);
  const [SpiritValue, setSpiritValue] = useState(1);
  const [IngredientsValue, setIngredientsValue] = useState('');
  const [TypeOfDrinksValue, setTypeOfDrinksValue] = useState(1);

  const [Images, setImages] = useState([]);

  const onTitleChange = (event) => {
    setTitleValue(event.currentTarget.value);
  };

  const onIngredientsChange = (event) => {
    setIngredientsValue(event.currentTarget.value);
  };

  const onDescriptionChange = (event) => {
    setDescriptionValue(event.currentTarget.value);
  };

  const onPriceChange = (event) => {
    setPriceValue(event.currentTarget.value);
  };

  const onSpiritsSelectChange = (event) => {
    setSpiritValue(event.currentTarget.value);
  };
  const onTypeOfDrinksSelectChange = (event) => {
    setTypeOfDrinksValue(event.currentTarget.value);
  };

  const upadateImages = (newImages) => {
    console.log(newImages);
    setImages(newImages);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (
      !TitleValue ||
      !DescriptionValue ||
      !PriceValue ||
      !SpiritValue ||
      !Images ||
      !IngredientsValue
    ) {
      return alert('Fill all the fields');
    }

    const variables = {
      title: TitleValue,
      description: DescriptionValue,
      price: PriceValue,
      images: Images,
      spirits: SpiritValue,
      ingredients: IngredientsValue,
    };

    Axios.post('/api/product/uploadProduct', variables).then((response) => {
      if (response.data.success) {
        alert('Product Successfully Uploaded');
        props.history.push('/');
      } else {
        alert('Failed to upload Product');
      }
    });
  };

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2}>Upload Cocktail Product</Title>
      </div>

      <Form onSubmit={onSubmit}>
        {/* DropZone */}
        <FileUpload refreshFunction={upadateImages} />
        <br />
        <br />
        <label>Title</label>
        <Input onChange={onTitleChange} value={TitleValue} />
        <br />
        <br />
        <label>Ingredients</label>
        <Input onChange={onIngredientsChange} value={IngredientsValue} />
        <br />
        <br />
        <label>Description</label>
        <TextArea onChange={onDescriptionChange} value={DescriptionValue} />
        <br />
        <br />
        <label>Price(€)</label>
        <Input onChange={onPriceChange} value={PriceValue} type='number' />
        <br />
        <br />
        <select onChange={onSpiritsSelectChange}>
          {Spirits.map((item) => (
            <option key={item.key} value={item.key}>
              {item.value}
            </option>
          ))}
        </select>
        <br />
        <br />
        <select onChange={onTypeOfDrinksSelectChange}>
          {TypeOfDrinks.map((item) => (
            <option key={item.key} value={item.key}>
              {item.value}
            </option>
          ))}
        </select>
        <br />
        <br />

        <Button onClick={onSubmit}>Submit</Button>
      </Form>
    </div>
  );
}

export default UploadProductPage;
