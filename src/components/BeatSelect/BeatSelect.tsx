function BeatSelect() {
  const handleOnSelect = e => {
    console.log(e.target.value);
  };

  return (
    <select onChange={handleOnSelect} defaultValue='123'>
      <option value='hero'>Один</option>
      <option value='as'>Два</option>
      <option value='123'>Три</option>
    </select>
  );
}

export default BeatSelect;
