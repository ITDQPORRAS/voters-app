const services={
    removeComma(number){
        if (number) {
            return number.toString().replace(",", "");
        }
      return 0;
    }
}

export default (services);