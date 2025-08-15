const Step04 = () => {
  return (
    <div>
      <h2>인용구 등록</h2>
      <p>제출하기 전에 정보를 검토하세요.</p>
      멀티 폼{/* Add form review and submission logic here */}
      인용구를 여러개 등록하고 지울 수 있다 rhf useFieldArray 활용 인용구가 두개
      이상일때는 모든 인용구 필드 하단에 페이지 번호를 입력하는 인풋이 추가된다
      유효성 검사: 페이지 번호는 문자가 오면 안되고(숫자만 가능), 책 페이지
      수보다 작아야한다. 인용구가 두개 이상일때는 모든 페이지 번호 인풋은
      required 이고, 한개 이하일때는 optional 이다.
      <blockquote>
        <p>Make sure all details are correct.</p>
      </blockquote>
    </div>
  );
};

export default Step04;
